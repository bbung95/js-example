(function () {
    "use strict";

    const get = (target) => {
        return document.querySelector(target);
    };

    const $progressBar = get(".progress-bar");
    let timerId;

    const throttle = (callback, time) => {
        if (timerId) return;
        timerId = setTimeout(() => {
            callback();
            timerId = undefined;
        }, time);
    };

    const scrollEvent = () => {
        const currentScroll = document.documentElement.scrollTop;
        const viewHeigth = document.documentElement.clientHeight;
        const documentHeigth = document.documentElement.scrollHeight;

        const scrollPercent = (currentScroll / (documentHeigth - viewHeigth)) * 100;
        $progressBar.style.width = `${scrollPercent}%`;
    };

    window.addEventListener("scroll", () => throttle(scrollEvent, 10));
})();
