const urlMap = {
    fetchLogininfo: '/api/rbacUser/logininfo',  //获取登录账户信息
    fetchLogin: '/api/rbacUser/login',  //获取登录账户信息
    fetchYardList: '/api/yard/selectList',  //获取场地列表
    fetchIndexProfit: '/api/report/busStatistics',  //获取首页收益数据
    fetchIndexORder: '/api/report/orderStatistics',  //获取首页订单数据
    fetchYardInfoList: '/api/yard/list',  //获取场地列表




    fetchOneDevice: '/api/device/read',  //获取一个设备的详情
    fetchOneYard: '/api/yard/read',  //获取一个产地的详情
    fetchCombo: '/api/combo/list',  //获取套餐列表
    fetchGoodsList: '/api/commodity/selectList',  //所有商品列表
    fetchYardShop: '/api/midDeviceCommodity/findShopList',  //获取场地已选商品
    fetchOneGift: '/api/gift/read',  //获取单个礼品数据
    fetchGiftGroup: '/api/giftGroup/selectList',  //获取礼品分组
    switchGiftLabal: '/api/gift/selected',  //切换礼品标签
    fetchOneGiftGroup: '/api/giftGroup/read',  //获取某个商城分类的详情
    fetchGiftList: '/api/gift/list',  //获取某个商城分类的详情
    fetchGroupGiftList: '/api/giftGroup/getGroupGift',  //获取某个商城分类下的礼品列表
    fetchLevelList: '/api/level/list',  //获取等级列表
    fetchIntegral: '/api/dictionaries/getMoneyBonusRate',  //获取积分比例
    fetchCouponList: '/api/couponType/getSelectedByType',  //获取优惠券下拉选
    fetchOneSuggestion: '/api/suggestion/read',  //获取优惠券下拉选
    fetchSysUser: '/api/user/sysUserSelect',  //获取管理员列表
    fetchOneAdv: '/api/ats/read',  //获取管理员列表
    fetchOneCoupon: '/api/couponType/read',  //获取单个优惠券的详情
    fetchMidCouponList: '/api/midUserCoupon/selectedList',  //获取单个优惠券的券码
    fetchYardComboList: '/api/combo/comboListByYardId',  //获取单个场地套餐
};

const services = {};


Object.keys(urlMap).forEach((methodName) => {
    services[methodName] = function(params, showLoaing=true, showServerErrMsg=true) {
        return $.ajax({
            url: urlMap[methodName],
            data: params,
            showLoaing: showLoaing,
            showServerErrMsg: showServerErrMsg
        });
    };
});

export default services;