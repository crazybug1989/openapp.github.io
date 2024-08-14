/*
 * 智能机浏览器版本信息:
 *
 */
var browser = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1,
            weibo: u.indexOf('weibo') > -1
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

console.log(browser);

const searchParams = new URLSearchParams(window.location.search);
// 获取邀请码
const inviteCode = searchParams.get('code');

if (browser.versions.android) {
    console.log('增加按钮');
}
if (browser.versions.weixin || browser.versions.weibo) {
    // $('.wechat').addClass('wechat_active');
}
if (!browser.versions.ios) {
    // $('.a_down_url').addClass('android_active');
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

var openAppTimer = null;
// 通过监听网页的可见性来判断拉起APP是否成功
window.addEventListener('visibilitychange', () => {
    // 监听页面visibility
    if(document.hidden) {
        // 如果页面隐藏了，则表示唤起成功，这时候需要清除下载定时器
        if (openAppTimer)
        {
            clearTimeout(openAppTimer)
        }
    }
})

/**
 * 下载点击
 */
$('.a_down').on('click', function () {
    console.log('下载');
    try {
        $('#tips').css("display:block")
    } catch (e) {};

    // var uuids = getCookie('cid');
    // if (null != uuids && uuids != "") {
    //     uuids = uuids;
    // } else {
    //     uuids = uuid();
    //     setCookie('cid', uuids);
    // }
    // var datelong = new Date().getTime();
    if (browser.versions.android) {
        var startTime, endTime;

        // 拉起本地已安装的APP
        try {
            startTime = (new Date()).getTime()
            var iframe = document.createElement("iframe");
            iframe.style.border = "none";
            iframe.style.width = "1px";
            iframe.style.height = "1px";
            iframe.src = 'kesanguo://com.njke.sanguo/invite' + (inviteCode !== null ? ('?inviteCode=' + inviteCode) : '')
            document.body.appendChild(iframe);
            endTime = (new Date()).getTime();
        } catch (e) {

        }

        // 跳转到下载页
        openAppTimer = setTimeout(() => {
            var d = navigator.userAgent.match(/Chrome\/(\d+)/);
            try {
                startTime = (new Date()).getTime()
                var iframe = document.createElement("iframe");
                iframe.style.border = "none";
                iframe.style.width = "1px";
                iframe.style.height = "1px";
                iframe.src = ''
                document.body.appendChild(iframe);
                endTime = (new Date()).getTime();
            } catch (e) {

            }
        }, 3000)
    } else if (browser.versions.ios) {
        // 拉起本地已安装APP
        location.href = 'kesanguo://com.njke.sanguo/invite' + (inviteCode !== null ? ('?inviteCode=' + inviteCode) : '');
        // 跳转到下载页
        openAppTimer = setTimeout(() => {
            location.href = '';
        }, 3000)
    } else {
        // 设置一个默认下载页
        setTimeout(() => {
            location.href = '';
        }, 250)
    }

})

console.log(1024)