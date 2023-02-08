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

    const getView = () => {
        const $view = get(".view");
        const title = decodeURI(location.hash.split("&")[1]);
        $view.querySelector(".description strong").textContent = title;

        $view.style.display = "flex";
        get(".contents.list").style.display = "none";
    };

    const getList = () => {
        const $list = get(".contents.list");

        $list.style.display = "flex";
        get(".view").style.display = "none";
    };

    const chagenView = () => {
        if (location.hash.includes("view")) {
            getView();
        } else {
            getList();
        }
    };

    const onHashChange = (e) => {
        e.preventDefault();
        const title = e.target.closest("figure").querySelector(".description strong").textContent;
        location.hash = `view&${encodeURI(title)}`;
    };

    const init = () => {
        $searchBtn.addEventListener("click", searchContents);

        $contentList.forEach((item) => {
            const $target = item.querySelector("picture");
            $target.addEventListener("mouseover", onMouseover);
            $target.addEventListener("mouseout", onMouseout);
            item.addEventListener("click", onHashChange);
        });

        window.addEventListener("hashchange", chagenView);
        chagenView();
    };

    init();

    // video
    const $video = get(".view video");
    const $progressBar = get(".js-progress");
    const $replay = get(".js-replay");
    const $pause = get(".js-stop");
    const $play = get(".js-play");
    const $muted = get(".js-mute");
    const $volume = get(".js-volume");
    const $fullScreen = get(".js-fullScreen");

    $video.addEventListener("timeupdate", (e) => {
        $progressBar.value = Math.floor(($video.currentTime / $video.duration) * 100);
    });

    $progressBar.onclick = (e) => {
        const percent = e.offsetX / $progressBar.offsetWidth;
        $progressBar.value = Math.floor(percent * 100);
        $video.currentTime = $video.duration * percent;
    };
    $play.onclick = () => {
        $video.play();
    };
    $pause.onclick = () => {
        $video.pause();
    };
    $replay.onclick = () => {
        $video.load();
        $video.play();
    };
    const changeMute = (isMute) => {
        isMute ? ($muted.style.backgroundColor = "red") : ($muted.style.backgroundColor = "#2f62b3");
    };
    $muted.onclick = () => {
        if ($video.muted) {
            $video.muted = false;
            $video.volume = 0.1;
        } else {
            $video.muted = true;
            $video.volume = 0;
        }
    };

    $volume.oninput = (e) => {
        $video.volume = e.target.value;
    };
    $video.addEventListener("volumechange", () => {
        $volume.value = $video.volume;
        if ($video.volume == 0) $video.muted = true;
        if ($video.volume > 0) $video.muted = false;
        changeMute($video.muted);
    });

    $fullScreen.onclick = (e) => {
        $video.requestFullscreen();
    };
})();
