import { setMbtiSection } from "./module/mbtiSelect.js";
import { setResultContainer, setSelectBtn, setSelectCards } from "./module/selectCard.js";
import { setShareURLBtn } from "./module/share.js";
import { setTabMenuEvent } from "./module/tabMenu.js";
import { countUp } from "./utils/countUp.js";

const data = {
    participate: 1234123152,
};

// 메인 총 참여자 수
const participateDOM = document.querySelector("#participate-number");
countUp(participateDOM, data.participate, 3000);

// 텝 스크롤 이벤트
setTabMenuEvent();

// 카드 세팅
setSelectCards();
setSelectBtn();

// 결과 페이지
setResultContainer();

// 유형 검사
setMbtiSection();

// 공유버튼
setShareURLBtn();
