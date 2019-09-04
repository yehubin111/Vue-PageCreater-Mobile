/**
     * @note 防劫持代码
     * @key MutationObserver 提供了监视对DOM树所做更改的能力 
     */
(function () {
    var srcFilterTags = ['script', 'iframe'];
    // 域名白名单 可以加多个
    var whiteList = ['chunk-common', 'chunk-vendors', 'pagetemplate', 'httpHijacked'];
    var whiteSign = 'shendun-eddy'; // 页面内script白名单标识
    var whiteListReg = [];

    // 正则匹配
    whiteList.forEach(function (wl) {
        var wlReg = new RegExp('/.+?\/\/' + wl + '|\/\/' + wl + '|.+?\.' + wl + '|^' + wl);
        whiteListReg.push(wlReg);
    });
    // 白名单助手
    var inWhileList = function (addedNode) {
        // shendun-eddy 是script的白名单标签
        if (addedNode.src === '' && addedNode.getAttribute(whiteSign) !== null) {
            return true;
        }

        var isInWhiteList = false;

        whiteListReg.forEach(function (wlReg) {
            if (wlReg.test(addedNode.src)) {
                isInWhiteList = true;
                return false;
            }
        });

        return isInWhiteList;
    };

    // dom观察器
    var mutationHandler = function (records) {
        records.forEach(function (record) {
            Array.prototype.slice.call(record.addedNodes).forEach(function (addedNode) {
                srcFilterTags.forEach(function (tagName) {
                    // 标签匹配 白名单匹配
                    if (addedNode.tagName === tagName.toUpperCase() && !inWhileList(addedNode)) {
                        addedNode.remove();
                    };
                });
            });
        })
    };

    // 核心 - MutationObserver 提供了监视对DOM树所做更改的能力
    // 优点 - 动态监听是否有非法的 iframe 和 script 代码
    // 缺点 - 无法查找头部直接插入的代码
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        observeMutationSupport = !!MutationObserver;
    var html = document.getElementsByTagName('html')[0];

    if (observeMutationSupport) {
        new MutationObserver(mutationHandler).observe(html, {
            'childList': true,
            'subtree': true
        });
    }

    // 唯独直接加载的不能remove掉，异步加载的都能remove掉！！
    // ***  记录头部的script，通知工信部 ***
    var eleList = document.querySelectorAll('script');
    var len = eleList.length;
    for (var i = 0; i < len; i++) {
        // 遍历操作
        if (!inWhileList(eleList[i])) {
            // do sth 这里的删除虽然已经晚了，因为头部同步JS已被执行，删除操作意义不大，但可以统计被劫持的代码是什么，记录好LOG 通知工信部
            // sendLog
            eleList[i].remove();
        }
    }
})();