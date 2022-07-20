/*
 * @Date: 2022-07-20 15:14:51
 * @LastEditors: xiaoWen
 * @LastEditTime: 2022-07-20 16:11:32
 * @FilePath: /study-vue/src/array.js
 */

import { observe } from './observe/index';

const oldArrayProto = Array.prototype;
let newArrayProto = Object.create(oldArrayProto);
const methods = ['push', 'pop', 'unshift', 'shift', 'splice', 'reverse'];
methods.forEach(methosd => {
  newArrayProto[methosd] = function (...args) {
    console.log('methosd', methosd);
    const result = oldArrayProto[methosd].apply(this, args);

    // 需要对新增的数据进行再次劫持
    let newData;
    switch (methosd) {
      case 'push':
      case 'unshift':
        newData = args;
        break;
      case 'splice':
        newData = args.slice(2);
        break;
      default:
        break;
    }
    if (newData.length > 0) {
      console.log('要对数组内新添加的东东做劫持!');
      // observe(newData);
      this.__ob__.observerArray(newData);
    }
    return result;
  };
});

export default newArrayProto;
