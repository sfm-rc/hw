import Storage from './storage';

// 本地存储校验规则
const setStorageName = (name) => {
  const names = name.toString().split('_');
  return names;
};

const cache = {
  localcache: new Storage({
    setRealName: setStorageName,
  }),
  sessioncache: new Storage({
    type: 'session',
    setRealName: setStorageName,
  }),
};

export default cache;
