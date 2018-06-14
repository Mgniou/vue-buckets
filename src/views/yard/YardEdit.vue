<template>
	<div class="contain-wrap">
		<el-form ref="form" :rules="rules" :model="form" label-width="90px">
			<el-form-item label="场地名称" prop="name">
				<el-input v-model="obj.name"></el-input>
			</el-form-item>
			<el-form-item label="场地地址" prop="name">
				<el-input v-model="obj.name"></el-input>

			</el-form-item>
			<el-form-item label="场地类型" prop="name">
				<el-select v-model="obj.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="场地租金" prop="name">
				<el-input v-model="obj.name"></el-input>
			</el-form-item>
			<el-form-item label="套餐模板" prop="name">
				<el-select v-model="obj.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<el-form-item>
			<el-button type="primary" size="small" @click="">保存</el-button>
			<el-button type="primary" size="small" @click="">返回</el-button>
		</el-form-item>


	</div>
</template>

<script>
    import base from '@/common/js/util';
    import service from '@/common/js/service';
    import {mapState} from 'vuex';

    export default {
        name: "login",
        data() {
            return {
                obj: {},
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            ...mapState([
                'temp'
            ]),
        },
        methods: {

        },
		created(){

            // this.obj = base.assignObj({
             //    id: '',
             //    name: '',
             //    type: '',
             //    area: '',
             //    rent: '',
             //    gps: '',
			// }, this.temp.obj)
		}
    }

</script>

<style lang="scss" scoped>

</style>