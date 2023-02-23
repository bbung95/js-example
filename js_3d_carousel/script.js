(function () {
    "use strict";

    const get = (target) => {
        return document.querySelector(target);
    };

    const $carousel = get(".carousel");
    const $prevBtn = get(".prev_button");
    const $nextBtn = get(".next_button");

    let itemCount = 6;
    let index = 0;

    const rotateCarousel = () => {
        const angle = (index / itemCount) * -360;
        $carousel.style.transform = `translateZ(-364px) rotateY(${angle}deg)`;
    };

    $prevBtn.onclick = () => {
        index--;
        rotateCarousel();
    };
    $nextBtn.onclick = () => {
        index++;
        rotateCarousel();
    };
})();
