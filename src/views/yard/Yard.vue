<template>
    <div class="contain-wrap">
        <el-row :gutter="15">
            <el-col :span="3">
                <el-select class="select" v-model="searchObj.type" placeholder="请选择场地类型" @change="searchBtn">
                    <el-option label="请选择场地类型" value=""></el-option>
                    <el-option
                            v-for="item in yardTypeList"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select class="select" v-model="searchObj.combo" placeholder="请选择套餐类型" @change="searchBtn">
                    <el-option label="请选择套餐类型" value=""></el-option>
                    <el-option
                            v-for="item in yardComboList"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <div class="wrap">
            <div class="wrap-title">
                <span>投放场地</span>
                <el-row>
                    <el-button type="primary" size="mini" @click="openAddEditModal">增加场地</el-button>
                    <el-button type="primary" size="mini">导出EXCEL</el-button>
                </el-row>
            </div>

            <el-table :data="yardInfoList"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="场地名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="area"
                        label="省市区">
                </el-table-column>
                <el-table-column
                        prop="combo"
                        label="套餐类型">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="场地类型" :formatter="formatYard">
                </el-table-column>
                <el-table-column
                        prop="rent"
                        label="每天租金">
                </el-table-column>
                <el-table-column
                        prop="deviceCount"
                        label="设备数量">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="openAddEditModal(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="pagination">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange" :page-size="searchObj.pageSize" :total="total">
            </el-pagination>
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
                yardTypeList: [{text: '购物中心', code: 1}, {text: '步行街', code: 2}, {text: '办公楼', code: 3}],
                yardComboList: [{text: '通用套餐', code: 0}, {text: '场地套餐', code: 1}],
                searchObj: {
                    type: '',
                    combo: '',
                    pageNo: 1,
                    pageSize: 15,
                },
                yardInfoList: [],
                total: 1,
            }
        },
        methods: {
            //格式化场地
            formatYard(row, column){
                if (row.type === 1) {
                    return '购物中心';
                } else if (row.type === 2) {
                    return '步行街'
                } else if (row.type === 3)  {
                    return '办公楼'
                } else {
                    return '未知'
                }
            },

            searchBtn(){
                this.searchObj.pageNo = 1;
                this.initYardInfoList();
            },

            handleCurrentChange(val){
                this.searchObj.pageNo = val;
                this.initYardInfoList();
            },
            initYardInfoList(){
                service.fetchYardInfoList(this.searchObj).done(({code, obj}) => {
                    if (code === 0) {
                        this.yardInfoList = obj.list;
                        this.total = Number(obj.totalPage);
                    }
                });
            },
            openAddEditModal(row){
                let obj = {
                    yardTypeList: this.yardTypeList
                };
                if (row) {
                    obj.row = row;
                }

                this.$store.dispatch('setTemp', obj);
                this.$router.push('/yardEdit');
            },
        },
        created(){
            this.initYardInfoList();
        },
    }

</script>

<style lang="scss" scoped>
    .wrap {
       border-bottom: none;
    }
</style>