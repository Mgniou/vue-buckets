<template>
	<div class="login-wrap">
		我是权限

	</div>
</template>

<script>
    import base from '@/common/js/util';
    import service from '@/common/js/service';

    export default {
        name: "login",
        data() {
            return {

            }
        },
        methods: {

        },
    }

</script>

<style lang="scss" scoped>

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