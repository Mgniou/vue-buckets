<template>
    <div class="login-wrap">
        <div class="logo">基础数据服务平台</div>
        <div class="login-form">
            <h3 class="form-title">登录</h3>
            <el-form ref="formData" :model="formData" :rules="rules">
                <el-form-item prop="account">
                    <el-input v-model="formData.account" clearable placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="formData.password" type="password" clearable placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginBtn('formData')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import base from '@/common/js/util';
    import service from '@/common/js/service';

    export default {
        name: "login",
        data() {
            return {
                formData: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 6, message: '密码必须不小于六位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            loginBtn(val) {
                this.$refs[val].validate((valid) => {
                    if (valid) {
                        service.fetchLogin(this.formData).done(({code, obj}) => {
                            if (code === 0) {
                                base.cookie(base.cookieId, obj);
                                let path = location.href.split('=')[1] || '';
                                this.$router.push(`/${path}`);
                            }
                        });
                    }
                });
            }
        },
    }

</script>

<style lang="scss">
    body {
        background-color: rgb(233, 236, 243);
    }

    .login-wrap {
        .logo {
            margin: 60px auto 0;
            padding: 15px;
            text-align: center;
            font-size: 26px;
        }
        .login-form {
            background-color: #fff;
            border-radius: 7px;
            width: 400px;
            margin: 40px auto 10px auto;
            padding: 10px 30px 0;
            overflow: hidden;
            position: relative;
            .form-title {
                color: #4db3a5;
                text-align: center;
                font-size: 28px;
                font-weight: 400 !important;
                margin-bottom: 25px;
            }
        }
    }
</style>