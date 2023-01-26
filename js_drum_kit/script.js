(function () {
    "use strict";

    const get = function (target) {
        return document.querySelector(target);
    };

    const getAll = function (target) {
        return document.querySelectorAll(target);
    };

    const keys = Array.from(getAll(".key"));

    const soundsRoot = "assets/sounds/";
    const drumSounds = [
        { key: 81, sound: "clap.wav" },
        { key: 87, sound: "crash.wav" },
        { key: 69, sound: "hihat.wav" },
        { key: 65, sound: "kick.wav" },
        { key: 83, sound: "openhat.wav" },
        { key: 68, sound: "ride.wav" },
        { key: 90, sound: "shaker.wav" },
        { key: 88, sound: "snare.wav" },
        { key: 67, sound: "tom.wav" },
    ];

    // Audio Element play Function
    const playSound = (keyCode) => {
        const $audio = get(`audio[data-key="${keyCode}"]`);
        const keyDOM = get(`[data-key="${keyCode}"]`);

        if (!$audio) return;

        keyDOM.classList.add("playing");
        $audio.currentTime = 0;
        $audio.play();
    };

    // keyDown Event Functio
    const onKeyDownEvent = (event) => {
        const keyCode = event.keyCode;
        playSound(keyCode);
    };

    // mouse Click Event Function
    const onClickEvent = (event) => {
        const keyCode = event.target.dataset.key;
        playSound(keyCode);
    };

    // Audio Element Create
    const getAudioElement = (index) => {
        const audioDOM = document.createElement("audio");
        audioDOM.dataset.key = drumSounds[index].key;
        audioDOM.src = `${soundsRoot}${drumSounds[index].sound}`;
        return audioDOM;
    };

    // tranfrom End Function
    const onTransitionEnd = (event) => {
        if (event.propertyName !== "transform") return;
        event.target.classList.remove("playing");
    };

    // key Element setting
    const setKeyProperties = () => {
        keys.forEach((item, index) => {
            const audioDOM = getAudioElement(index);
            item.appendChild(audioDOM);
            item.dataset.key = drumSounds[index].key;
            item.onclick = onClickEvent;
            item.ontransitionend = onTransitionEnd;
        });
    };

    // init function
    const init = () => {
        document.onkeydown = onKeyDownEvent;
        setKeyProperties();
    };

    init();
})();
