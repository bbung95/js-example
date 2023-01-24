import { appendChildrenList, makeDOMwithProperties } from "./utils/dom.js";
import { MOUSE_CONTROL_SCORE_KEY, TOUCH_NUMBER_SCORE_KEY, ARROW_SPEED_SCORE_KEY } from "./constants/localStorage.js";
import { getTimeString } from "./utils/time.js";

const localStrageKeyMap = {
    1: MOUSE_CONTROL_SCORE_KEY,
    2: TOUCH_NUMBER_SCORE_KEY,
    3: ARROW_SPEED_SCORE_KEY,
};

const cardInfoList = [
    {
        id: 1,
        url: "mouse_control.html",
        thumnail: "public/assets/mouse_control_thumbnail.png",
        title: "마우스 컨트롤 게임",
        isNew: true,
    },
    {
        id: 2,
        url: "arrow_speed.html",
        thumnail: "public/assets/arrow_speed_thumbnail.png",
        title: "방향키 게임",
        isNew: false,
    },
    {
        id: 3,
        url: "touch_number.html",
        thumnail: "public/assets/touch_number_thumbnail.png",
        title: "숫자 클릭 게임",
        isNew: false,
    },
];

const gameCardListDOM = document.querySelector("#game-list-container");

const getGameCard = ({ id, url, thumnail, title, isNew }) => {
    const gameCardDOM = makeDOMwithProperties("a", {
        className: "game-card",
        href: url,
    });

    const thumnailDOM = makeDOMwithProperties("img", {
        src: thumnail,
        alt: title,
    });

    const newBadgeDOM = isNew
        ? makeDOMwithProperties("span", {
              className: "game-new-badge",
              textContent: "new",
          })
        : "";
    const titleDOM = makeDOMwithProperties("div", {
        className: "game-title",
        textContent: title,
    });

    const result = localStorage.getItem(localStrageKeyMap[id]);

    const resultDOM = makeDOMwithProperties("div", {
        className: "game-result",
        textContent: result ? `최고 기록 : ${getTimeString(result)}` : "도전해보세요!",
    });

    appendChildrenList(gameCardDOM, [thumnailDOM, newBadgeDOM, titleDOM, resultDOM]);

    gameCardListDOM.appendChild(gameCardDOM);
};

const setCardList = () => {
    cardInfoList.forEach((item) => {
        getGameCard(item);
    });
};

setCardList();
