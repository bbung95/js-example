const numberBtnList = document.querySelectorAll(".number-button");

const setButtonDOM = () => {
    for (let item of numberBtnList) {
        item.style.top = `${Math.floor(Math.random() * 100 * 0.9)}%`;
        item.style.left = `${Math.floor(Math.random() * 100 * 0.9)}%`;
    }
};

setButtonDOM();
