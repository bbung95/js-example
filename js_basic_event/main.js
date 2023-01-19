import { countUp } from "./utils/countUp.js";

const data = {
    participate: 1234123152,
};

const participateDOM = document.querySelector("#participate-number");
participateDOM.textContent = data.participate;

countUp(participateDOM, data.participate, 5000);
