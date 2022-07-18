/*
 * @Date: 2022-07-18 17:28:01
 * @LastEditors: xiaoWen
 * @LastEditTime: 2022-07-18 18:08:49
 * @FilePath: /study-vue/src/state.js
 */

import { observe } from './observe/index';

// 初始化数据
export function initState(vm) {
  const opts = vm.$option;
  if (opts.data) {
    initData(vm);
  }
  // if(opts.props) {
  //   initProps(vm)
  // }
}

function initData(vm) {
  let data = vm.$option.data;
  data = typeof data === 'function' ? data.call(vm) : data;
  vm._data = data;
  observe(data);

  // 将vm._data 用vm来代理
  proxy(vm, data, '_data');
}

function proxy(vm, target, proxyTargetName) {
  Object.keys(target).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm[proxyTargetName][key];
      },
      set(newValue) {
        vm[proxyTargetName][key] = newValue
      }
    });
  });
}
