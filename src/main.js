import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import service from '@/common/js/service';
import ajaxInit from '@/common/js/ajaxInit';
import base from '@/common/js/util';

import VueRouter from 'vue-router'
import Vuex from 'vuex'

import routes from './routes'
import store from './store/index';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

ajaxInit.init();

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    const meta = to.meta;

    if (to.name) {
        document.title = to.name;
    }

    if (meta.requireAuth) {
        let rtnPath = to.path !== '/' ? to.path : '';

        if (base.getCookieSid()) {
            if (!store.getters.user) {
                service.fetchLogininfo().then(({code, obj}) => {
                    if (code === 0) {
                        store.commit('fetchUser', obj);
                        next();
                    }
                });
            } else {
                next();
            }
        } else {
            if (rtnPath) {
                rtnPath = rtnPath.split('/')[1];
                next(`/login?rtn=${rtnPath}`);

            } else {
                next('/login');
            }
        }
    } else {
        next();
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

