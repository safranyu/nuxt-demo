## Nuxt 利用amfe-flexible+postcss-pxtorem实现移动端自适应
1. 安装	
   `cnpm install -S amfe-flexible postcss-pxtorem`

2. 配置

   - 在**`app.html`**`head`标签内添加

     `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">`

   - 在`nuxt.config.js`的`head`里添加

     >把`amfe-flexiblex`下的index复制到这里面`static`下面引用的路径

     ```javascript
     script: [
           { src: '/flexible/js/index.js', type: 'text/javascript', charset: 'utf-8' }
         ]
     ```

   - `nuxt.config.js`的`build`里添加

      ```javascript
      postcss: [
        require('postcss-pxtorem')({
          rootValue: 75.0,
          propList: ['*'] //配置所有，具体配置说明前往https://github.com/cuth/postcss-pxtorem
        })
      ]
      ```
      

3.参考

[lib-flexible](https://github.com/amfe/lib-flexible)

[nuxt.js服务端渲染使用postcss-px2rem](https://blog.csdn.net/kingov/article/details/79827613)

[vue-cli3+vant ui组件快速开发自适应移动端应用](https://blog.csdn.net/qq_40513881/article/details/84109699)


4.在使用`amfe-flexible`出现两`body`查看代码是
`var fakeBody = document.createElement('body')`这个创建了一个body元素改为
`var fakeBody = document.body`

## UI框架的使用[Vant](https://youzan.github.io/vant/#/zh-CN/quickstart)
>可以参考官网的教程很详细
这里我全局引入

1.安装
`cnpm install -S vant`
2.新建插件文件
在 plugins 目录添加 vant.js 插件文件，用来引用 Vant 组件：
vant.js
```
import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css'

Vue.use(Vant)
```
3.注册插件

在 nuxt.config.js 文件里注册插件：
nuxt.config.js
```
plugins: [{src: '~plugins/vant', ssr: true}],
```

4.使用
在 page 文件中直接使用标签：

index.vue
```
<template>
  <van-row>
    <van-button size="large">来点我呀</van-button>
  </van-row>
</template>

<script>
  export default {
  }
</script>
```
5.按需引入
> babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式
```
# 安装 babel-plugin-import 插件
npm i babel-plugin-import -D
```

```
// .babelrc 中配置
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}

// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};
```
- 引入
```
import { Button, Cell } from 'vant';
```

## 使用Axios，并配置全局拦截器，解决跨域的问题
在前后分离的场景下开发，经常会遇到下面场景
```
The 'Access-Control-Allow-Origin' header has a value 'http://xxx.com' that is not equal to the supplied origin. Origin 'http://localhost:3000' is therefore not allowed access.
```
> 在vue里面我们可以使用vue cli 自带的 proxyTable来解决这个问题 （解决方案）
那么我们怎么在nuxtjs 能像vue这么方便的解决这个问题呢？
有些小伙伴可能会想到直接使用express 中间件，主动改变header

```
app.use('/', function(req, res) {
  const url = 'https://127.0.0.1:3001/api' + req.url
  req.pipe(request(url)).pipe(res.set('Access-Control-Allow-Origin', '*'))
})
```
1.  安装依赖

```
npm install @nuxtjs/axios @nuxtjs/proxy --save
```

2. 使用处理跨域问题

```
// nuxt.config.js
module.exports = {
  modules: [ '@nuxtjs/axios' ], // 不需要加入@nuxtjs/proxy
  axios: {
    proxy: true,
  //  prefix: '/api', // baseURL
  //  credentials: true,
  },
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:3001', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
    },
  }
}

```
3. 组件的使用
```
<script>
export default {
  fetch ({ app }) {
    console.log(app.$axios)
  },
  asyncData ({ app }) {
    console.log(app.$axios)
  },
  created () {
    console.log(this.$axios)
  }
}
</script>

```
到此为止，我们并不需要在plugins配置axios，但是如果要设置全局拦截器，那么就要新建一个/plugins/axios.js
```
export default function (app) {
  let axios = app.$axios; 
 // 基本配置
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  // 请求回调
  axios.onRequest(config => {})

  // 返回回调
  axios.onResponse(res => {})

  // 错误回调
  axios.onError(error => {})
}
```
然后在plugins配置它
```
module.exports = {
  plugins = [
    {
      src: "~/plugins/axios",
      ssr: false
    },
  ]
}
```
## postcss-pxtorem需要忽略转换
```
// `Px` or `PX` is ignored by `postcss-pxtorem` but still accepted by browsers
.ignore {
    border: 1Px solid; // ignored
    border-width: 2PX; // ignored
}
```

## 问题集
1. 从其他页面进去首页页面没有刷新，且报错500，关闭同源策略显示页面但是数据没有请求

2. vue图片路径问题
> data里图片路径想通过img显示

  - 把图片放在src同级的static文件夹下。
  - 把图片放在cdn上，把网络地址存在data里，然后直接`<img :src="img">`去展示。
  - 图片放在assets文件夹，然后在data里面require进图片
    ```
    data(){
      return{
        img: require('~/assets/img.png')
      }
    }
    ```
    然后`<img :src="img">`

3. Nuxt 子组件里不能使用`asyncData`,也就是只能在page页面里使用,可以在页面使用`asyncData`之后传值给子组件，也可以用`nuxtServerInit`把数据保存在store

4. 报babel-node不被识别为内部或外部命令,可操作程序或批处理文件
`npm install babel-cli` 就可以解决