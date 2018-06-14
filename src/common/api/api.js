import axios from 'axios';

export const fetchUser = params => { return axios.post(`/api/getLoginInfo.do`, params).then(res => res.data); };

const urlMap = {
    fetchUser: '/api/getLoginInfo.do',
    login: '/api/login.do',
    sendCode: '/api/user/getVerifyCode.do',

    fetchProjectList: '/api/project/getProjList.do',
    fetchProject: '/api/project/getOneProject.do',

    fetchInvestorList: '/api/investor/getInvestorList.do',
    fetchInvestor: '/api/investor/getOneInvestor.do',

    addEnquiry: '/api/enquiry/addEnquiry.do',
    fetchEnquiryList: '/api/enquiry/getCurrentUserEnquiryList.do',

    fetchBannerList: '/api/banner/getBannerList',
};

const services = {};


Object.keys(urlMap).forEach((methodName) => {
    services[methodName] = function(params, type='get') {
        return axios({
            url: urlMap[methodName],
            method: type,
            data: params,
        });
    };
});

export default services;