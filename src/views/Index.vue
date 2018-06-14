<template>
    <div class="body">
        <section class="header">
            <div class="header-logo">
                <img class="logo-icon" src="../common/img/logo.png" alt="">
                <el-menu class="el-menu-demo"
                         mode="horizontal"
                         @select="handleSelect"
                         background-color="#545c64"
                         text-color="#fff"
                         :default-active="$route.path"
                         active-text-color="#ffd04b"
                         router
                >
                    <template v-for="(item,index) in menuList" v-if="item.children">
                        <el-menu-item v-if="item.meta.leaf" v-show="auth(item.children[0].meta.code)" :index="item.children[0].path">{{item.children[0].name}}</el-menu-item>

                        <el-submenu v-if="!item.meta.leaf" :index="index + ''" v-show="auth(item.meta.code)">
                            <template slot="title">{{item.name}}</template>
                            <el-menu-item v-for="(subItem, index) in item.children" v-show="auth(subItem.meta.code)" v-if="subItem.meta.requireAuth && !subItem.meta.hide" :key="index" :index="subItem.path">{{subItem.name}}</el-menu-item>
                        </el-submenu>
                    </template>
                </el-menu>
            </div>

            <div class="userInfo">
                <img class="photo" src="../common/img/avatar9.jpg" alt="">
                <span>{{user.nickName}}</span>
                <i class="el-icon-delete" @click="logOut"></i>
            </div>
        </section>

        <section class="content">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item v-for="item in $route.matched" v-if="!item.meta.leaf" :key="item.path">
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>

            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </section>

        <section class="footer">
            2017 © by 深圳伍壹科技有限公司.
        </section>
    </div>
</template>

<script>
    import base from '../common/js/util';
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                menuList: []
            };
        },
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        methods: {
            auth: function (code) {
                return base.auth(code, this.user.permissions);
            },

            handleSelect(key, keyPath) {
                console.log(this.$route.matched)
            },
            logOut() {
                base.cookie(base.cookieId, null, {
                    expires: 0
                });
                this.$router.push('/login');
            }
        },
        created() {
            this.menuList = this.$router.options.routes;
        }
    }
</script>




<style lang="scss">
    .content {
        .breadcrumb {
            padding: 15px;
        }
    }

    .contain-wrap {
        background: #fff;
        margin: 0 15px;
        min-height: 780px;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 15px;
    }

    .header {
        width: 100%;
        height: 60px;
        background: rgb(84, 92, 100);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-logo {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .logo-icon {
            width: 60px;
            padding: 0 20px;
        }
    }

    .userInfo {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
        padding: 0 20px 0 0;
        cursor: pointer;
        .photo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .el-icon-delete {
            margin-left: 10px;
        }
    }

    .footer {
        width: 100%;
        display: inline-block;
        text-align: center;
        line-height: 60px;
    }

    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .select {
        width: 100%;
    }
    .wrap {
        border: 1px solid #e7ecf1;
        margin: 0 0 15px 0;

        .wrap-title {
            height: 48px;
            padding: 0 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
            background: #fafafa;
        }

    }

    .pagination {
        display: flex;
        justify-content: flex-end;
        margin: 0 0 15px 0;
    }
</style>