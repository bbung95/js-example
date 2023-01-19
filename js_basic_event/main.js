import { setTabMenuEvent } from "./module/tabMenu.js";
import { countUp } from "./utils/countUp.js";

const data = {
    participate: 1234123152,
};

const participateDOM = document.querySelector("#participate-number");

countUp(participateDOM, data.participate, 3000);

setTabMenuEvent();
