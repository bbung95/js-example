import { handleModalClose, handleModalOpen } from "./utils/modal.js";
import { getNowTime, getResultTimeString, setTimer, startTimer, stopTimer } from "./utils/time.js";
import { TOUCH_NUMBER_SCORE_KEY } from "./constants/localStorage.js";

const numberBtnList = document.querySelectorAll(".number-button");

const startNum = 1;
const endNum = 10;
let targetNum = startNum;

const initTouchNumberGame = () => {
    setTimer(0);
    stopTimer();
    setButtonDOM();
    targetNum = startNum;
};

const initialize = () => {
    const [headerRetryBtn, modalRetryBtn] = document.querySelectorAll(".retry-button");
    modalRetryBtn.onclick = () => {
        handleModalClose(initTouchNumberGame);
    };

    headerRetryBtn.onclick = () => {
        handleModalClose(initTouchNumberGame);
    };
};

const handleSuccessGame = () => {
    stopTimer();
    handleModalOpen({
        isSuccess: true,
        timeString: getResultTimeString(),
    });

    const nowSpendTime = getNowTime();
    const currentSpendTime = localStorage.getItem(TOUCH_NUMBER_SCORE_KEY);

    if (!currentSpendTime || currentSpendTime > nowSpendTime) {
        localStorage.setItem(TOUCH_NUMBER_SCORE_KEY, nowSpendTime);
    }
};

const handleFailGame = () => {
    stopTimer();
    handleModalOpen({
        isSuccess: false,
    });
};

// number elements random setting
const setButtonDOM = () => {
    for (let item of numberBtnList) {
        item.style.display = "block";

        item.style.top = `${Math.floor(Math.random() * 100 * 0.9)}%`;
        item.style.left = `${Math.floor(Math.random() * 100 * 0.9)}%`;
        item.onclick = (event) => {
            const numId = event.target.textContent;

            if (isNaN(numId)) return;

            // 시작
            if (startNum == numId) {
                startTimer(handleFailGame);
            }
            // 끝
            if (endNum == targetNum) {
                handleSuccessGame();
            }

            // 타켓 클릭
            if (targetNum == numId) {
                event.target.style.display = "none";
                targetNum++;
                return;
            }
        };
    }
};

setButtonDOM();
initialize();
