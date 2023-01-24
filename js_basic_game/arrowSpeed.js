import { appendChildrenList, makeDOMwithProperties } from "./utils/dom.js";
import { handleModalClose, handleModalOpen } from "./utils/modal.js";
import { getNowTime, getResultTimeString, startTimer, setTimer, stopTimer } from "./utils/time.js";
import { ARROW_SPEED_SCORE_KEY } from "./constants/localStorage.js";

const arrowFieldDOM = document.querySelector("#arrow-field");

const MAX_ARROW = 8;
const MAX_ROUND = 3;

let targetIdx = 0;
let round = 1;
let arrowDOMList = [];
let isArrowSpeedGameStart = false;

const initArrowSpeedGame = () => {
    setTimer(0);
    stopTimer();
    setArrowDOM();
    targetIdx = 0;
    round = 1;
    isArrowSpeedGameStart = false;
};

const initialize = () => {
    const [headerRetryBtn, modalRetryBtn] = document.querySelectorAll(".retry-button");
    modalRetryBtn.onclick = () => {
        handleModalClose(initArrowSpeedGame);
    };

    headerRetryBtn.onclick = () => {
        handleModalClose(initArrowSpeedGame);
    };
};

const clearArrowDOM = () => {
    arrowDOMList.forEach((item) => item.remove());
    arrowDOMList = [];
};

const setArrowDOM = () => {
    clearArrowDOM();
    for (let i = 0; i < MAX_ARROW; i++) {
        const direction = Boolean(Math.floor(Math.random() * 2)) ? "left" : "right";
        const arrowDOM = makeDOMwithProperties("span", {
            className: `arrow arrow-${direction}`,
            innerHTML: direction === "left" ? "&lt;" : "&gt;",
        });
        arrowDOMList.push(arrowDOM);
    }
    appendChildrenList(arrowFieldDOM, arrowDOMList);
};

const handleSuccessGame = () => {
    stopTimer();
    handleModalOpen({
        isSuccess: true,
        timeString: getResultTimeString(),
    });

    const nowSpendTime = getNowTime();
    const currentSpendTime = localStorage.getItem(ARROW_SPEED_SCORE_KEY);

    if (!currentSpendTime || currentSpendTime > nowSpendTime) {
        localStorage.setItem(ARROW_SPEED_SCORE_KEY, nowSpendTime);
    }
};

const handleFaildGame = () => {
    stopTimer();
    handleModalOpen({
        isSuccess: false,
    });
};

const setKeyboardEvent = () => {
    const handleCorrect = () => {
        arrowDOMList[targetIdx].style.display = "none";
        targetIdx++;

        // 다음라운드로
        if (targetIdx == MAX_ARROW) {
            if (round == MAX_ROUND) {
                handleSuccessGame();
                return;
            }
            round++;
            targetIdx = 0;
            setArrowDOM();
        }
    };

    document.onkeydown = (event) => {
        if (!["ArrowLeft", "ArrowRight"].includes(event.code)) return;

        const isFirst = targetIdx == 0 && round == 1 && !isArrowSpeedGameStart;

        if (isFirst) {
            startTimer(handleFaildGame);
            isArrowSpeedGameStart = true;
        }

        if (isArrowSpeedGameStart)
            if (arrowDOMList[targetIdx].innerHTML == "&lt;" && event.code == "ArrowLeft") {
                handleCorrect();
                return;
            }
        if (arrowDOMList[targetIdx].innerHTML == "&gt;" && event.code == "ArrowRight") {
            handleCorrect();
            return;
        }
    };
};

setArrowDOM();
setKeyboardEvent();
initialize();
