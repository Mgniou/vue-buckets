import Login from './views/login/Login.vue'
import Index from './views/Index.vue'
import Main from './views/main/Main.vue'
import Auth from './views/auth/Auth.vue'
import Yard from './views/yard/Yard.vue'
import YardEdit from './views/yard/YardEdit.vue'


let routes = [
    {
        path: '/login',
        name: '登录',
        component: Login,
        meta: { requireAuth: false }
    },
    {
        path: '/',
        name: '',
        component: Index,
        meta: { leaf: true, requireAuth: true },
        children: [
            { component: Main, path: '/', name: '首页', meta: { requireAuth: true, code: 1 } }
        ]
    },
    {
        path: '/',
        component: Index,
        name: '场地管理',
        meta: { requireAuth: true, code: 1 },
        children: [
            { path: '/yard', component: Yard, name: '场地列表', meta: { requireAuth: true, code: 1 } },
            { path: '/yardEdit', component: YardEdit, name: '新增/编辑场地', meta: { requireAuth: true , code: 1, hide: true} }
        ]
    },
    {
        path: '/',
        name: '系统管理',
        component: Index,
        meta: { requireAuth: true, code: 1 },
        children: [
            { path: '/auth', component: Auth, name: '权限管理', meta: { requireAuth: true, code: 1 } },
        ]
    },



];

export default routes;