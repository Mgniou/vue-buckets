// 全局 ajax 处理：加遮罩以及错误提示
// 自定义了两个配置：
// blockUI---等于false时不显示遮罩
// showServerErrMsg---等于false时不显示服务器返回的errMsg
let ajaxNum = 0;

import { Loading,Message } from 'element-ui';

let loading;

function megAlert(msg) {
    Message({
        message: msg,
        type: 'error',
        duration: 2000
    })
}

export default {
    init: function () {
        $(document).ajaxSend(function (event, jqXHR, options) {
            jqXHR.setRequestHeader("version", "2.0");
            //  通过自定义属性blockUI控制是否显示遮罩，只有值为false才不显示
            if (options.showLoaing !== false) {
                if (ajaxNum === 0) {
                    loading = Loading.service({
                        fullscreen: true,
                        text: '加载中...'
                    });
                }
                ajaxNum += 1;
            }
        }).ajaxComplete(function (event, jqXHR, options) {
            ajaxNum -= 1;
            if (ajaxNum === 0) {
                setTimeout(() => {
                    loading && loading.close();
                }, 300)
            }
        }).ajaxError(function (event, jqXHR, options, thrownError) {
            switch (jqXHR.status) {
                case(500):
                    megAlert("服务器系统内部错误");
                    break;
                case(401):
                    megAlert("未登录");
                    break;
                case(403):
                    megAlert("无权限执行此操作");
                    break;
                case(404):
                    megAlert("找不到对应的资源");
                    break;
                case(408):
                    megAlert("请求超时");
                    break;
                default:
                    megAlert("操作失败，可能是网络、服务器、数据格式等原因导致");
            }
        }).ajaxSuccess(function (event, jqXHR, options) {
            jqXHR.done(function (result) {
                //  通过自定义属性showServerErrMsg控制是否显示遮罩，只有值为false才不显示
                if (options.showServerErrMsg !== false && result && (result.errCode !== 0)) {
                    result.errMsg && megAlert(result.errMsg);
                }
            })
        });

        $.ajaxSetup({
            global: true,
            cache: false,
            timeout: 10 * 60 * 1000 // 10min
        });
    }
}