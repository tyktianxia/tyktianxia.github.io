function loadDisqus() {
    var d = document, s = d.createElement('script');
    s.src = 'https://acris.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    window.disqus_config = function () {
        this.page.url = document.location.origin + document.location.pathname + document.location.search;
        this.page.identifier = document.location.origin + document.location.pathname + document.location.search;
    };
}

function initDisqus() {
    // 通过检查 window 对象确认是否在浏览器中运行
    var runningOnBrowser = typeof window !== "undefined";
    // 通过检查 scroll 事件 API 和 User-Agent 来匹配爬虫
    var isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent);
    // 检查当前浏览器是否支持 IntersectionObserver API
    var supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;

    // 一个小 hack，将耗时任务包裹在 setTimeout(() => { }, 1) 中，可以推迟到 Event Loop 的任务队列中、等待主调用栈清空后才执行，在绝大部分浏览器中都有效
    // 其实这个 hack 本来是用于优化骨架屏显示的。一些浏览器总是等 JavaScript 执行完了才开始页面渲染，导致骨架屏起不到降低 FCP 的优化效果，所以通过 hack 将耗时函数放到骨架屏渲染完成后再进行。
    setTimeout(function () {
        if (!isBot && supportsIntersectionObserver) {
            // 当前环境不是爬虫、并且浏览器兼容 IntersectionObserver API
            var disqus_observer = new IntersectionObserver(function (entries) {
                // 当前视窗中已出现 Disqus 评论框所在位置
                if (entries[0].isIntersecting) {
                    // 加载 Disqus
                    loadDisqus();
                    // 停止当前的 Observer
                    disqus_observer.disconnect();
                }
            }, {threshold: [0]});
            // 设置让 Observer 观察 #disqus_thread 元素
            let element = document.getElementById('disqus_thread')
            if (element) {
                disqus_observer.observe(element);
            }
        } else {
            // 当前环境是爬虫、或当前浏览器其不兼容 IntersectionObserver API
            // 直接加载 Disqus
            loadDisqus();
        }
    }, 5);
}

window.addEventListener('DOMContentLoaded', (event) => {
    initDisqus();
});
