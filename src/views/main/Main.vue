<template>
	<div class="contain-wrap">
		<el-row :gutter="15">
			<el-col :span="3">
				<el-select class="select" v-model="searchObj.yardId" placeholder="请选择场地" @change="periodBtn">
					<el-option label="全部" value=""></el-option>
					<el-option
							v-for="item in yardList"
							:key="item.id"
							:label="item.name"
							:value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="6">
				<el-date-picker class="select" @change="periodBtn"
						v-model="dateValue"
						type="daterange"
						align="right"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						value-format="timestamp"
						:picker-options="datePicker">
				</el-date-picker>
			</el-col>
		</el-row>

		<div class="wrap">
			<p class="title">营业额统计</p>
			<div class="chartBox" id="gradeChart"></div>
		</div>
		<div class="wrap">
			<p class="title">订单统计</p>
			<div class="chartBox" id="orderChart"></div>
		</div>
	</div>
</template>

<script>
    import base from '@/common/js/util';
    import echarts from "echarts";
    import service from '@/common/js/service';

    export default {
        name: "login",
        data() {
            return {
				yardList: [],	//场地列表
                searchObj: {	//查询条件
                    yardId: '',
                    startTime: '',
                    endTime: ''
				},
                dateValue: [],
                datePicker: {}, //时间选择器
                gradeData: {}, //营业数据
                gradeX: [],
                gardeY: [],
                profitY: [],
                orderData: {}, //订单数据
                orderX: [],
                orderY: []
            }
        },
        methods: {
            //初始化时间选择器
			initDatePicker(){
                this.datePicker = {
                    shortcuts: [{
                        text: '最近一天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }],
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    }
                }
			},
			//初始化页面
			initPage(){
                let now = new Date().valueOf();
                now = base.timestampDate(base.formatDate(now) + ' 00:00:00');
                this.searchObj.endTime = now;
                this.searchObj.startTime = now - 7 * 24 * 60 * 60 * 1000;
                this.dateValue = [this.searchObj.startTime, this.searchObj.endTime];
                this.fetchTradeInfo();
                this.fetchOrderInfo();
			},
            //时间选择器处理
            periodBtn() {
                this.searchObj.startTime = base.timestampDate(base.formatDate(this.dateValue[0]) + ' 00:00:00');
                this.searchObj.endTime = base.timestampDate(base.formatDate(this.dateValue[1]) + ' 00:00:00');
                this.clearChart();
                this.fetchTradeInfo();
                this.fetchOrderInfo();
            },
            //清空图表数据
            clearChart() {
                this.gradeX.length = 0;
                this.gardeY.length = 0;
                this.profitY.length = 0;
                this.orderX.length = 0;
                this.orderY.length = 0;
            },
            //获取营业额统计
            fetchTradeInfo() {
                service.fetchIndexProfit(this.searchObj).done(({ code, obj }) => {
                    if (code === 0) {
                        $.map(obj.list, (v, i) => {
                            v.profit = v.recharge_sum - (v.rent + v.wawa_money);
                            this.gradeX.push(base.formatDate(v.create_time));
                            this.gardeY.push(v.recharge_sum);
                            this.profitY.push(v.profit);
                        });

                        this.gradeChart.setOption({
                            xAxis: [
                                {
                                    data: this.gradeX
                                }
                            ],
                            series: [
                                {
                                    data: this.gardeY
                                },
                                {
                                    data: this.profitY
                                }
                            ]
                        });
                    }
                });
            },
            //营业额统计折线图
            initGradeChart(id) {
                this.gradeChart = echarts.init(document.getElementById(id)); //dom节点的ID
                this.gradeChart.showLoading(); //开启加载动画
                this.gradeChart.setOption({
                    title: {
                        text: "",
                        show: false
                    },
                    toolbox: {
                        right: "5%",
                        top: "5%",
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        data: ["营业额", "净利润"],
                        top: "4%"
                    },
                    color: ["#49a9ee", "#f35d75"], //legend颜色
                    tooltip: {
                        //图表类型
                        trigger: "axis",
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: [
                        {
                            type: "category",
                            boundaryGap: false,
                            data: [],
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: "元",
                            type: "value",
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            }
                        }
                    ],
                    series: [
                        {
                            name: "营业额",
                            type: "line",
                            lineStyle: {
                                normal: {
                                    color: "#49a9ee"
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: "#daeefc"
                                }
                            },
                            data: []
                        },
                        {
                            name: "净利润",
                            type: "line",
                            lineStyle: {
                                normal: {
                                    color: "#f35d75"
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: "#f38193"
                                }
                            },
                            data: []
                        }
                    ]
                });
                this.gradeChart.hideLoading(); //关闭加载动画
            },
            //获取订单统计
            fetchOrderInfo() {
                service.fetchIndexORder(this.searchObj).done(({ code, obj }) => {
                    if (code === 0) {
                        $.map(obj.list, (v, i) => {
                            this.orderX.push(base.formatDate(v.create_time));
                            this.orderY.push(v.recharge_count);
                        });

                        this.orderChart.setOption({
                            xAxis: [
                                {
                                    data: this.orderX
                                }
                            ],
                            series: [
                                {
                                    data: this.orderY
                                }
                            ]
                        });
                    }
                });
            },
            //营业额统计折线图
            initOrderChart(id) {
                this.orderChart = echarts.init(document.getElementById(id)); //dom节点的ID
                this.orderChart.showLoading(); //开启加载动画
                this.orderChart.setOption({
                    title: {
                        text: "",
                        show: false
                    },
                    toolbox: {
                        right: "5%",
                        top: "5%",
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        data: ["营业额", "净利润"]
                    },
                    color: ["#49a9ee", "#f35d75"], //legend颜色
                    tooltip: {
                        //图表类型
                        trigger: "axis",
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: [
                        {
                            type: "category",
                            boundaryGap: false,
                            data: [],
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: "",
                            type: "value",
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            }
                        }
                    ],
                    series: [
                        {
                            name: "订单总数",
                            type: "line",
                            lineStyle: {
                                normal: {
                                    color: "#49a9ee"
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: "#daeefc"
                                }
                            },
                            data: []
                        }
                    ]
                });
                this.orderChart.hideLoading(); //关闭加载动画
            },
            //根据窗口改变折线图大小
            resizeChart() {
                this.gradeChart.resize();
                this.orderChart.resize();
            },
        },
        created() {
            this.initPage();
            this.initDatePicker();
            window.addEventListener("resize", this.resizeChart);
        },
        mounted() {
            this.initGradeChart("gradeChart");
            this.initOrderChart("orderChart");
        },
        beforeRouteEnter (to, from, next) {
            service.fetchYardList().done(({code, obj}) => {
               	if (code === 0) {
               	    next(vm => {
                        vm.yardList = obj;
					})
				}
			});
        }
    }

</script>

<style lang="scss" scoped>
	.title {
		line-height: 48px;
		padding: 0 15px;
		font-size: 16px;
		background: #fafafa;
		margin: 0;
	}
	.chartBox {
		width: 100%;
		height: 500px;
		background: #fff;
	}
</style>