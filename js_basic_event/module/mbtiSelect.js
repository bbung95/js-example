const mbtiQuestionDOM = document.querySelector(".mbti-question");
const [yesBtn, noBtn] = document.querySelector(".mbti-select").children;
const [selectDOM, pendingDOM, resultDOM] = document.querySelectorAll(".mbti-container");
const mbtiResultTitleDOM = document.querySelector(".mbti-result");
const mbtiResultDescriptioneDOM = document.querySelector(".mbti-description");
const mbtiRetryBtn = document.querySelector(".mbti-retry-button");

const mbtiQuestionList = ["찐 과자가 단 과자보다 좋다.", "봉지 과자가 박스 과자보다 좋다.", "과자를 뜯으면 한 번에 다 먹는다."];

const getMbtiResult = (resultValue) => {
    switch (resultValue) {
        case 0:
            return {
                title: "과자 어린이 (A 유형)",
                desc: "과자 어린이 (A 유형) 설명",
            };
        case 1:
            return {
                title: "과자 초심자 (B 유형)",
                desc: "과자 초심자 (B 유형) 설명",
            };
        case 2:
            return {
                title: "과자 중급자 (C 유형)",
                desc: "과자 중급자 (C 유형) 설명",
            };
        case 3:
        default:
            return {
                title: "과자 고수 (D 유형)",
                desc: "과자 고수 (D 유형) 설명",
            };
    }
};

let resultValue = 0;
let currentRound = 0;
const maxRound = mbtiQuestionList.length;

const setPendingSection = () => {
    selectDOM.style.display = "none";
    pendingDOM.style.display = "block";

    setTimeout(() => {
        pendingDOM.style.display = "none";
        resultDOM.style.display = "block";
    }, 3000);
};

const setResultSection = () => {
    const { title, desc } = getMbtiResult(resultValue);

    mbtiResultTitleDOM.textContent = title;
    mbtiResultDescriptioneDOM.textContent = desc;
};

const initialize = () => {
    currentRound = 0;
    resultValue = 0;
    resultDOM.style.display = "none";
    setMbtiSection();
};

export const setMbtiSection = () => {
    if (currentRound === maxRound) {
        setPendingSection();
        setResultSection();

        mbtiRetryBtn.onclick = () => {
            initialize();
        };
        return;
    }
    selectDOM.style.display = "block";

    mbtiQuestionDOM.textContent = mbtiQuestionList[currentRound++];

    yesBtn.onclick = () => {
        resultValue++;
        setMbtiSection();
    };
    noBtn.onclick = () => {
        setMbtiSection();
    };
};
