(function () {
    "use strict";

    const get = (target) => document.querySelector(target);
    const getAll = (target) => document.querySelectorAll(target);

    const $searchInput = get("#search");
    const $searchBtn = get(".btn_search");

    const $contentList = getAll(".contents.list figure");

    const searchContents = () => {
        const keyword = $searchInput.value;

        $contentList.forEach((item) => {
            const title = item.querySelector(".description strong").textContent;
            if (title.includes(keyword)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    };

    const onMouseover = (e) => {
        const webpPlay = e.target.parentNode.querySelector("source");
        webpPlay.setAttribute("srcset", "./assets/sample.webp");
    };

    const onMouseout = (e) => {
        const webpPlay = e.target.parentNode.querySelector("source");
        webpPlay.setAttribute("srcset", "./assets/sample.jpg");
    };

    const init = () => {
        $searchBtn.addEventListener("click", searchContents);

        console.log($contentList);

        $contentList.forEach((item) => {
            const $target = item.querySelector("picture");
            $target.addEventListener("mouseover", onMouseover);
            $target.addEventListener("mouseout", onMouseout);
        });
    };

    init();
})();
