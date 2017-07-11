import { assign } from 'lodash';

const symbolTimeout = Symbol('timeout');
const symbolType = Symbol('key');

export default class Storage {

  /*
   * 序列化对象
   * @param {object}
   */
  static serialize(data) {
    return JSON.stringify(data);
  }

  /*
   * 反序列化字符串
   * @param {string}
   */
  static deserialize(string) {
    return JSON.parse(string);
  }

  /**
   * 重置k为大写
   * @param  {string} key 本地存储key值
   * @return {string}     [description]
   */
  static toUpper(key) {
    return `${key}`.toUpperCase();
  }

  constructor(options) {
    const defalut = {
      timeout: 365 * 24 * 60 * 60 * 1000, // 过期时间
      type: 'local', // 存储媒介
    };

    this.config = assign(defalut, options);
    this[symbolTimeout] = this.config.timeout;
    this[symbolType] = this.config.type;
  }

  support = () => {
    const storageType = 'sessionStorage';
    let webStorage;

    try {
      const supported = (storageType in window && window[storageType] !== null);

      const key = (Math.round(Math.random() * 1e7));
      if (supported) {
        webStorage = window[storageType];
        webStorage.setItem(key, '');
        webStorage.removeItem(key);
      }

      return supported;
    } catch (e) {
      alert('您可能启用了无痕浏览模式，开启后将无法为您节省流量且会导致部分功能无法使用，建议关闭无痕浏览后继续访问。'); // eslint-disable-line
      return !1;
    }
  }

  /**
   * 在当前时间基础上增加时间
   * @param  int second 增加的ms数
   * @return {[symbolType]}        [description]
   */
  getTime = second => (+new Date() + (+second || 0));

  /**
   * 设置过期时间
   * @param int second 保存的时间
   */
  setExpiredTime = second => (this[symbolTimeout] = parseInt(second, 10));

  /**
   * 获取保存时间
   * @param int second 保存的时间
   */
  getSaveTime = (name) => {
    const type = this[symbolType];
    const key = Storage.toUpper(name);

    // 获取本地缓存
    let val;
    val = this.getItem(type, key);
    val = val && Storage.deserialize(val);

    if (val) {
      val = val.savetime;
    }

    return val;
  }

  /**
   * 缓存值至本地媒介
   * @param string key   缓存key值
   * @param string value 缓存值
   */
  set = (name, value, timeout) => {
    const self = this;
    const type = this[symbolType];
    const key = Storage.toUpper(name);

    const cachetime = this.getTime(timeout || this[symbolTimeout]);
    // 更新本地存储
    if (value && typeof value === 'function') {
      value = value(self.get(key)); // eslint-disable-line
    }

    let val = {
      data: value,
      timeout: cachetime,
      savetime: this.getTime(),
    };

    val = Storage.serialize(val);

    this.setItem(type, key, val);

    return [key, value, timeout];
  }

  /**
   * 获取缓存在本地的值
   * @return all 缓存在本地的值
   */
  get = (name) => {
    const self = this;
    const type = this[symbolType];
    const key = Storage.toUpper(name);

    // 获取本地缓存
    let val;
    val = this.getItem(type, key);

    // 本地存储是否过期
    val = val && Storage.deserialize(val);
    if (val && (val.timeout > self.getTime())) {
      val = val.data;
    } else {
      val = null;
      self.clear(key);
    }

    return val;
  }

  /**
   * 删除本地存储的值
   * @param  string key 本地存储标识
   * @return {[symbolType]}     [description]
   */
  clear = (name) => {
    const type = this[symbolType];
    const key = Storage.toUpper(name);
    this.removeItem(type, key);
  }
  /**
   * 设置本地存储信息
   * @param type
   * @param key
   * @param value
   */
  setItem = (type, key, val) => {
    const support = this.support;
    const self = this;
    let value;


    if (support) {
      window[`${type}Storage`].setItem(key, val);
    } else {
      value = self.getWindowName();
      value[key] = val;
      self.setWindowName(value);
    }

    return [type, key, val];
  }

  /**
   * 获取本地存储信息
   * @param type
   * @param key
   */
  getItem = (type, key) => {
    const support = this.support;
    const self = this;
    let value;

    if (support) {
      value = window[`${type}Storage`].getItem(key);
    } else {
      value = self.getWindowName();
      value = value && value[key];
    }

    return value;
  }

  /**
   * 清除本地存储信息
   * @param type
   * @param key
   * @returns {*}
   */
  removeItem = (type, key) => {
    const support = this.support;
    const self = this;
    let value;

    if (support) {
      value = window[`${type}Storage`].removeItem(key);
    } else {
      value = self.getWindowName();
      if (value) {
        delete value[key];
      }
      self.setWindowName(value);
    }
  }

  /**
   * 获取window.name
   * @returns {*|Window.name}
   */
  getWindowName = () => {
    let value = window.name;

    try {
      value = Storage.deserialize(value);
    } catch (e) {
      value = {};
    }

    return value;
  }

  /**
   * 设置window.name
   * @param value
   */
  setWindowName = (value = {}) => {
    window.name = Storage.serialize(value);
    return value;
  }
}
