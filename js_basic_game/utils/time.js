const MAX_TIME = 10;
const timerDOM = document.querySelector(".game-time");

let timerID = null;
let time = 0;
export let isGameStart = false;

const convertToTwoNumber = (num) => {
    const stringNum = String(num);

    if (stringNum.length === 1) {
        return `0${stringNum}`;
    } else {
        return stringNum;
    }
};

export const getTimeString = (time) => {
    const hours = Math.floor(time / 3600);
    time = time - hours * 3600;

    const minutes = Math.floor(time / 60);
    time = time - minutes * 60;

    const seconds = time;

    return `${convertToTwoNumber(hours)}:${convertToTwoNumber(minutes)}:${convertToTwoNumber(seconds)}`;
};

export const setTimer = (time) => {
    time = time;
    timerDOM.innerHTML = getTimeString(time);
};

export const startTimer = (onTimeOver) => {
    isGameStart = true;
    time = 0;
    timerID = setInterval(() => {
        time++;
        timerDOM.innerHTML = getTimeString(time);

        if (time >= MAX_TIME) {
            clearInterval(timerID);
            onTimeOver?.();
        }
    }, 1000);
};

export const stopTimer = () => {
    if (isGameStart) {
        isGameStart = false;
        clearInterval(timerID);
    }
};

export const getResultTimeString = () => {
    return getTimeString(time);
};

export const getNowTime = () => {
    return time;
};
