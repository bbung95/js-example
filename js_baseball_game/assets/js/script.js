const questionDOM = document.querySelector("#question");
const fightBtn = document.querySelector(".fight_btn");
const resultListDOM = document.querySelector(".result_list");
const titleDOM = document.querySelector(".ball_answer");

const MAX_ROUND = 10;
let baseNumber = [];
let round = 0;

fightBtn.onclick = () => {
    const value = questionDOM.value;
    const arr = [...value].map((num) => Number(num));

    let sameValueCount = 0;
    let sameIndexCount = 0;
    round++;

    const el = document.createElement("div");

    if (baseNumber.join("") == arr.join("")) {
        el.textContent = `${round}치 시도 : ${value}, 홈런!!`;
        resultListDOM.appendChild(el);
        titleDOM.textContent = value;
        return;
    }

    arr.forEach((num, idx) => {
        if (num == baseNumber[idx]) sameValueCount++;
        if (num != baseNumber[idx] && baseNumber.includes(num)) sameIndexCount++;
    });

    el.textContent = `${round}차 시도 : ${value}, STRIKE : ${sameValueCount}, BALL : ${sameIndexCount}`;
    resultListDOM.appendChild(el);
};

const setRandomBaseNumber = () => {
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = 0; i < 4; i++) {
        const idx = Math.floor(Math.random() * numbers.length);
        let number = numbers[idx];
        numbers.splice(idx, 1);
        baseNumber.push(number);
    }
};

(function () {
    "use strict";
    setRandomBaseNumber();
})();
