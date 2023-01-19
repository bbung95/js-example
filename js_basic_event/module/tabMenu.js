const selectAnchorMenuDOM = document.querySelector("#anchor-to-select");
const resultAnchorMenuDOM = document.querySelector("#anchor-to-result");
const mbtiAnchorMenuDOM = document.querySelector("#anchor-to-mbti");

const selectSectionDOM = document.querySelector("#title-section");
const resultSectionDOM = document.querySelector("#result-section");
const mbtiSectionDOM = document.querySelector("#mbti-section");

const setScrollEvent = (anchorDOM, targetDOM) => {
    anchorDOM.onclick = () => {
        window.scroll({
            left: 0,
            top: targetDOM.offsetTop,
            behavior: "smooth",
        });
    };
};

export const setTabMenuEvent = () => {
    /*
    1. href="#ID"
       - location.href = "#title-section";
    2. scrollTo *
       - window.scrollTo(0, selectSectionDOM.offsetTop);
    3. scrollToIntoView
       - mbtiSectionDOM.scrollIntoView({ behavior: "smooth" });
       - scrollTop을 지정해줄 수 없음
    */

    setScrollEvent(selectAnchorMenuDOM, selectSectionDOM);
    setScrollEvent(resultAnchorMenuDOM, resultSectionDOM);
    setScrollEvent(mbtiAnchorMenuDOM, mbtiSectionDOM);
};
