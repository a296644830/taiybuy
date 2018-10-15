import Vue from 'vue';

import App from './App.vue';

import VueRouter from 'vue-router';

import axios from "axios";

Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://111.230.232.110:8899';
// 跨域是否携带凭证
axios.defaults.withCredentials = true;

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import Vuex from 'vuex'

Vue.use(Vuex)

// 导入懒加载插件
import VueLazyload from 'vue-lazyload'
// use一下
Vue.use(VueLazyload, {
  // 失败图片
  error: require('./assets/logo.png'),
  // 成功图片 没有正常加载 vue模块化开发中 图片也是资源 需要 引入
  loading: require('./assets/logo.png'),
  // 
  // attempt: 1
})

import moment from "moment";
Vue.filter('beautifyTime', function (value, str, str2, str3) {

  return moment(value).format(`YYYY${str}MM${str2}DD${str3}`);
})
// 过滤器2 格式化日期
Vue.filter('beautifyTimePro', function (value, formatStr) {

  return moment(value).format(formatStr);
})


import './assets/statics/site/css/style.css';

import index from './components/index.vue';

// 导入detal组件
import detail from './components/detail.vue';

//导入购物车
import shopcart from './components/shopcart.vue';

//导入订单详情页
import checkOder from './components/checkOder.vue'

//导入登录页
import login from './components/login.vue'


import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

// import "./assets/cavars.js"



// import $ from 'jquery'

Vue.use(ElementUI);

import ProductZoomer from 'vue-product-zoomer'

Vue.use(ProductZoomer)



Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: index,
  },
  {
    path: '/index',
    component: index,
    meta:{
      zhName:'首页'
    }

  },
  {
    path: '/detail/:goodId',
    component: detail,
    meta:{
      zhName:'商品详情'
    }
    
  },
  {
    path: '/shopcart',
    component: shopcart,
    meta:{
      zhName:'购物车'
    }
  },
  {
    path: '/checkOder',
    component: checkOder,
    meta:{
      zhName:'订单详情页'
    }
  },
  {
    path: '/login',
    component: login,
    meta:{
      zhName:'登录页'
    }
  },



]

const store = new Vuex.Store({
  state: {
    shopCartData: JSON.parse(window.localStorage.getItem('cartData')) || {},
    isLogin: false
  },
  mutations: {
    addCart(state, opt) {
      if (state.shopCartData[opt.id] == undefined) {
        Vue.set(state.shopCartData, opt.id, opt.buyCount);
      } else {
        state.shopCartData[opt.id] += opt.buyCount;
      }

    },

    updateCart(state, opt) {
      // 使用新的数字 覆盖原始的数字
      state.shopCartData[opt.id] = opt.newCount;
    },

    delById(state, id) {
      // 如何删除对象中的一个属性 
      // delete state.shopCartData[id]
      // 使用Vue.delete删除才能同步
      Vue.delete(state.shopCartData, id);
    },
    //设置登录状态
    changeLoginState(state, loginState) {
      // 直接赋值即可
      state.isLogin = loginState;
    }
  },

  getters: {
    cartGoodCount(state) {
      let totalCount = 0;

      for (const key in state.shopCartData) {
        totalCount += state.shopCartData[key];
      }
      return totalCount;

    }
  }

})

const router = new VueRouter({
  routes,

})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.zhName;
 
  if(to.path=="/checkOder"){
    axios.get("site/account/islogin").then(response=>{
      console.log(response)
      if(response.data.code=="nologin"){
        // alert("还没登录,请登录");
        router.push("/login")
      }else{
        next()
      }

    })

    
  }else{
    next()
  }

})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,

  created() {
    axios.get("site/account/islogin").then(response=>{
    
      if(response.data.code === 'logined'){

        store.commit(changeLoginState,true)
      }else{

        store.commit(changeLoginState,false)
      }
    })
  },

}).$mount('#app')
window.onbeforeunload = function () {
  // 保存
  window.localStorage.setItem('cartData', JSON.stringify(store.state.shopCartData))
}