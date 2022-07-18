import { initState } from "./state";

/*
 * @Date: 2022-07-18 17:03:49
 * @LastEditors: xiaoWen
 * @LastEditTime: 2022-07-18 17:28:05
 * @FilePath: /study-vue/src/init.js
 */
export function initMixin(Vue) {
  Vue.prototype._init = function (option) {
    const vm = this;
    vm.$option = option;

    // 初始化状态
    initState(vm)
    // todo。。。
  };
}

