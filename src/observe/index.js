export function observe(data) {
  if (typeof data !== 'object' || data === null) {
    return; // 只对对象（饮用数据类型）劫持
  }

  // 如果一个对象被劫持过了，那就不需要再被劫持了（可以添加一个实例，来判断是否被劫持）
  return new Observer(data);
}

class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]));
  }
}

export function defineReactive(target, key, value) {
  // value属性 闭包
  observe(value); // 对所有属性都进行劫持-递归
  // defineProperty "重新定义"属性，性能差
  Object.defineProperty(target, key, {
    get() {
      console.log('用户get');
      return value;
    },
    set(newValue) {
      console.log('用户set');
      if (newValue === value) return;
      value = newValue;
    }
  });
}
