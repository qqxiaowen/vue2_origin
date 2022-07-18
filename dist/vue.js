(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function observe(data) {
    if (_typeof(data) !== 'object' || data === null) {
      return; // 只对对象（饮用数据类型）劫持
    } // 如果一个对象被劫持过了，那就不需要再被劫持了（可以添加一个实例，来判断是否被劫持）


    return new Observer(data);
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      this.walk(data);
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(target, key, value) {
    // value属性 闭包
    observe(value); // 对所有属性都进行劫持-递归
    // defineProperty "重新定义"属性，性能差

    Object.defineProperty(target, key, {
      get: function get() {
        console.log('用户get');
        return value;
      },
      set: function set(newValue) {
        console.log('用户set');
        if (newValue === value) return;
        value = newValue;
      }
    });
  }

  /*
   * @Date: 2022-07-18 17:28:01
   * @LastEditors: xiaoWen
   * @LastEditTime: 2022-07-18 18:08:49
   * @FilePath: /study-vue/src/state.js
   */

  function initState(vm) {
    var opts = vm.$option;

    if (opts.data) {
      initData(vm);
    } // if(opts.props) {
    //   initProps(vm)
    // }

  }

  function initData(vm) {
    var data = vm.$option.data;
    data = typeof data === 'function' ? data.call(vm) : data;
    vm._data = data;
    observe(data); // 将vm._data 用vm来代理

    proxy(vm, data, '_data');
  }

  function proxy(vm, target, proxyTargetName) {
    Object.keys(target).forEach(function (key) {
      Object.defineProperty(vm, key, {
        get: function get() {
          return vm[proxyTargetName][key];
        },
        set: function set(newValue) {
          vm[proxyTargetName][key] = newValue;
        }
      });
    });
  }

  /*
   * @Date: 2022-07-18 17:03:49
   * @LastEditors: xiaoWen
   * @LastEditTime: 2022-07-18 17:28:05
   * @FilePath: /study-vue/src/init.js
   */

  function initMixin(Vue) {
    Vue.prototype._init = function (option) {
      var vm = this;
      vm.$option = option; // 初始化状态

      initState(vm); // todo。。。
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
