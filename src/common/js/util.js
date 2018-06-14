let root = window,
    Cookie = require('./cookie');

let Base = {
    cookieId:'YI-PCSID',
    url: {
        location: root.location,
        cache: null,
        param: function (key) {
            var href = this.location.href,
                hrefWithoutHas = href.indexOf('#') > 0 ? href.substr(0, href.indexOf('#')) : href,
                paramStr = hrefWithoutHas.split('?')[1],
                cache,
                keys;

            if (paramStr) {
                if ((cache = this.cache) === null) {
                    keys = paramStr.split('&');
                    cache = this.cache = {};
                    $.each(keys, function (i, v) {
                        var _flag = v.split('=');
                        cache[_flag[0]] = _flag[1];
                    });
                }

                if (key) {
                    return cache[key];
                } else {
                    return cache;
                }
            }
        },
        hash: function () {
            let url = this.toUrl(this.location.href);
            return url.split('?')[1];
        },
        toUrl:function (url) {
            let redirectURL = Base.url.param('redirectURL');
            window.location.href = redirectURL ? decodeURIComponent(redirectURL) : url;
        }
    },
    getCookieSid: function(key){
        return Cookie.get(this.cookieId);
    },

    toFixed:function(num,s){
        var times = Math.pow(10, s),
            des = num * times + 0.5;

        des = parseInt(des, 10) / times;
        return des + ''
    },
    cookie: function (key, value, options) {
        var args = Array.prototype.slice.call(arguments);
        if(args.length >= 2){
            args[2] = $.extend({}, {
                domain: root.location.hostname,
                // domain: 'wandetech.com',
                path: '/',
                expires: 90 // 默认90天过期
            }, options);
        }
        return Cookie.apply(null,args);
    },
    assignObj: function (vm, firstSource) {
        for (var i = 1; i < arguments.length; i++) {
            var nextSource = arguments[i];
            if (nextSource && typeof nextSource !== "object")
                continue;
            for (var x in vm) {
                if (vm.hasOwnProperty(x) && nextSource.hasOwnProperty(x)) {
                    vm[x] = nextSource[x]
                }
            }
        }
        return vm
    },
    formatDate: function (value, dateStr) {
        var d = new Date(value);
        var year = d.getFullYear(),
            mouth = d.getMonth() + 1,
            date = d.getDate();
        if (dateStr == undefined)
            return [year, mouth, date].join('-');
        else
            return [year, mouth, date].join(dateStr);
    },
    formatDateTime: function (value, dateStr) {
        var d = new Date(value);
        var year = d.getFullYear(),
            mouth = d.getMonth() + 1,
            date = d.getDate(),
            hour = d.getHours(),
            minute = d.getMinutes(),
            second = d.getSeconds();
        if (dateStr == undefined)
            return [year, mouth, date].join('-') + ' ' + [hour, minute, second].join(':');
        else
            return [year, mouth, date].join(dateStr) + ' ' + [hour, minute, second].join(':');
    },
    timestampDate: function (value) {
        let timestamp = new Date(value).getTime();
        return timestamp;
    },
    uniqueArr: function (arr) {
        var n = {}, r = [], len = arr.length, val, type;
        for (var i = 0; i < len; i++) {
            val = arr[i];
            type = typeof val;
            if (!n[val]) {
                n[val] = [type];
                r.push(val);
            } else if (n[val].indexOf(type) < 0) {
                n[val].push(type);
                r.push(val);
            }
        }
        return r;
    },
    //验证权限
    auth: function (code, permission) {
        if (code == -10000) {
            return true;
        }
        var flag = false;
        for (let val of permission) {
            if (val == code) {
                flag = true;
                break;
            }
        }
        return flag;
    },
    ueFullScreenHandler(event, isFullScreen) {
        let $backDrop = $('.modal-backdrop'),
            $overflowEls = $('.modal-open, .modal-open .modal'),
            $navbar = $('.navbar-fixed-top'),
            $pagination = $('.pagination');
        if (isFullScreen) {
            $navbar.hide();
            $pagination.hide();
            $backDrop.hide();
            $overflowEls.addClass('visible-important');
        } else {
            $navbar.show();
            $pagination.show();
            $backDrop.show();
            $overflowEls.removeClass('visible-important');
        }
    }
};

export default Base;
