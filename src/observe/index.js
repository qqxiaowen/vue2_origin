import newArrayProto from '../array';

export function observe(data) {
  if (typeof data !== 'object' || data === null) {
    return; // 只对对象（引用数据类型）劫持
  }

  if (data.__ob__ instanceof Observer) {
    // 说明这个对象已经被代理过了
    return data.__ob__;
  }

  // 如果一个对象被劫持过了，那就不需要再被劫持了（可以添加一个实例，来判断是否被劫持）
  return new Observer(data);
}

class Observer {
  constructor(data) {
    Object.defineProperty(data, '__ob__', {
      // 给数据加了个标识，有__ob__，说明已经被观测代理过了
      value: this,
      ennumerable: false
    });
    if (Array.isArray(data)) {
      data.__proto__ = newArrayProto;
      this.observerArray(data); // 观察数组类型，减少基本数据类型的劫持
    } else {
      this.walk(data);
    }
  }
  walk(data) {
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]));
  }
  observerArray(data) {
    data.forEach(item => observe(item));
  }
}

export function defineReactive(target, key, value) {
  // value属性 闭包
  observe(value); // 对所有属性都进行劫持-递归
  // defineProperty "重新定义"属性，性能差
  Object.defineProperty(target, key, {
    get() {
      // console.log('用户get', key);
      return value;
    },
    set(newValue) {
      // console.log('用户set');
      if (newValue === value) return;
      observe(newValue); // 应对设置值为新对象的场景
      value = newValue;
    }
  });
}
