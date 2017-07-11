const fs = require('fs');

class AppCachePlugin {

  constructor({
    output = 'cache.json',
    routeBase = '',
    dist = '',
    uris = {},
    exclude = [],
  }) {
    this.output = output;
    this.routeBase = routeBase;
    this.dist = dist;
    this.uris = uris;
    this.exclude = exclude.map((exclusion) => {
      if (exclusion instanceof RegExp) return exclusion;
      return new RegExp(`^${exclusion}$`);
    });
    this.assets = [];
    this.routes = [];
    this.hash = '';
    this.publicPath = '';
  }

  addAsste(asset) {
    this.assets.push(asset);
  }

  addRoute(path) {
    this.routes.push(path);
  }

  size() {
    return Buffer.byteLength(this.source(), 'utf8');
  }

  source() {
    this.routes.map(route =>
      (this.uris[`${this.routeBase}${route}`] = `${this.dist}/index.html`));
    this.assets.map(assets =>
      (this.uris[`${this.publicPath}${assets}`] = `${this.dist}/${assets}`));
    return JSON.stringify({ uris: this.uris }, null, 2);
  }

  apply(compiler) {
    this.publicPath = compiler.options.output.publicPath || '';
    compiler.plugin('emit', (compilation, callback) => {
      Object.keys(compilation.assets)
        .filter(asset => !this.exclude.some(pattern => pattern.test(asset)))
        .forEach(asset => this.addAsste(asset));
      compilation.assets[this.output] = this; // eslint-disable-line
      compilation.modules
        .filter(module => (!/(node_modules|components|redux|utils)/.test(module.resource)))
        .forEach((module) => {
          if (module.resource) {
            const file = fs.readFileSync(module.resource, 'utf-8');
            const pattern = /<Route(?: [^>]*)+path=([^ >]*)(?: [^>]*)*>/;
            if (/path=/gi.test(file)) {
              file.split('\n')
                .filter(line => (pattern.test(line)))
                .forEach(line => this.addRoute(pattern.exec(line)[1].replace(/"/g, '')));
            }
          }
        });
      callback();
    });
  }
}

module.exports = AppCachePlugin;
