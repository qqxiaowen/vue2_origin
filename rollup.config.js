/*
 * @Date: 2022-07-18 15:49:03
 * @LastEditors: xiaoWen
 * @LastEditTime: 2022-07-18 16:11:32
 * @FilePath: /study-vue/rollup.config.js
 */
import babel from 'rollup-plugin-babel';
export default {
  input: './src/index.js',
  output: {
    file: './dist/vue.js',
    name: 'Vue', // global.Vue
    format: 'umd', // 打包后的格式： esm em6模块 commonjs模块 iife自执行函数 umd
    sourcemap: true // 是否可以调试源代码
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
