import { SELECT_RESULT_KEY } from "../constants/result.js";
import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";

const snackDatas = [
    {
        id: "1",
        imgSrc: "/js_basic_event/public/assets/초코꼬북칩.jpeg",
        name: "초코꼬북칩",
        desc: "맛있는 초코꼬북칩",
    },
    {
        id: "2",
        imgSrc: "/js_basic_event/public/assets/나쵸.jpeg",
        name: "나쵸",
        desc: "맛있는 나쵸",
    },
    {
        id: "3",
        imgSrc: "/js_basic_event/public/assets/허니버터칩.jpeg",
        name: "허니버터칩",
        desc: "맛있는 허니버터칩",
    },
    {
        id: "4",
        imgSrc: "/js_basic_event/public/assets/홈런볼.jpeg",
        name: "홈런볼",
        desc: "맛있는 홈런볼",
    },
];

const snackCardList = document.querySelector(".snack-card-list");
const selectBtnDOM = document.querySelector(".participate-button");
const [notyetContainerDOM, resultContainerDOM] = document.querySelectorAll(".result-container");
const [, resultImgDOM, resultNameDOM, resultDescDOM, selectRetryBtn] = resultContainerDOM.children;

const getSelectedCard = () => {
    return snackCardList.querySelector(".select");
};
const getCardById = (id) => {
    return snackCardList.querySelector(`#select-${id}`);
};

const handlerSelectCard = (id) => {
    const selectedCard = getSelectedCard();
    selectedCard?.classList.remove("select");

    const targetCard = getCardById(id);
    targetCard.classList.add("select");
};

const getSelectCard = ({ id, imgSrc, name, desc }) => {
    const snackCardDOM = makeDOMwithProperties("button", {
        id: `select-${id}`,
        className: "snack-card",
        onclick: () => {
            handlerSelectCard(id);
        },
    });

    const snackImgDOM = makeDOMwithProperties("img", {
        src: imgSrc,
        alt: name,
    });
    const snackInfoDOM = makeDOMwithProperties("div", {
        className: "snack-description",
    });

    const snackNameDOM = makeDOMwithProperties("div", {
        textContent: name,
    });

    const snackDescDOM = makeDOMwithProperties("div", {
        textContent: desc,
    });
    appendChildrenList(snackInfoDOM, [snackNameDOM, snackDescDOM]);
    appendChildrenList(snackCardDOM, [snackImgDOM, snackInfoDOM]);

    return snackCardDOM;
};

const moveSectionScroll = (targetDOM) => {
    window.scroll({
        left: 0,
        top: targetDOM.offsetTop,
        behavior: "smooth",
    });
};

const initialize = () => {
    localStorage.removeItem(SELECT_RESULT_KEY);

    setSelectCards();
    setResultContainer();

    const selectSectionDOM = document.querySelector("#participate-section");
    moveSectionScroll(selectSectionDOM);
};

export const setSelectCards = () => {
    // 리스트 삭제
    const originalSnackCards = Object.assign([], snackCardList.children);
    originalSnackCards.forEach((item) => item.remove());

    // snack 리스트 세팅
    snackDatas.forEach((item) => snackCardList.appendChild(getSelectCard(item)));

    const cardId = localStorage.getItem(SELECT_RESULT_KEY);
    if (!cardId || isNaN(cardId)) return;

    handlerSelectCard(cardId);
};

export const setSelectBtn = () => {
    selectBtnDOM.onclick = () => {
        const selectedCard = getSelectedCard();

        console.log(selectedCard);
        if (!selectedCard) {
            alert("선택된 카드가 없습니다.");
            return;
        }
        const cardId = selectedCard.id.replace("select-", "");

        localStorage.removeItem(SELECT_RESULT_KEY);
        localStorage.setItem(SELECT_RESULT_KEY, cardId);

        setResultContainer();

        const resultSectionDOM = document.querySelector("#result-section");
        moveSectionScroll(resultSectionDOM);
    };
};

export const setResultContainer = () => {
    const cardId = localStorage.getItem(SELECT_RESULT_KEY);

    // 없는 경우
    if (!cardId || isNaN(cardId)) {
        notyetContainerDOM.className = "result-container not-yet";
        resultContainerDOM.classList.remove("not-yet");
        return;
    }

    notyetContainerDOM.classList.remove("not-yet");
    resultContainerDOM.className = "result-container not-yet";

    const findSnack = snackDatas.find((item) => item.id == cardId);

    resultImgDOM.src = findSnack.imgSrc;
    resultImgDOM.alt = findSnack.name;
    resultNameDOM.textContent = findSnack.name;
    resultDescDOM.textContent = findSnack.desc;

    selectRetryBtn.onclick = () => initialize();
};
