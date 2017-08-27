class AppVersionPlugin {

  constructor({
    output = 'version.json',
  }) {
    this.output = output;
    this.hash = '';
  }

  size() {
    return Buffer.byteLength(this.source(), 'utf8');
  }

  source() {
    return JSON.stringify({ version: this.hash }, null, 2);
  }

  apply(compiler) {
    compiler.plugin('emit', (complation, callback) => {
      this.hash = complation.hash;
      complation.assets[this.output] = this; // eslint-disable-line
      callback();
    });
  }
}

module.exports = AppVersionPlugin;
