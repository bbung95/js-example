const modalDOM = document.querySelector(".modal");
const modalTitleDOM = modalDOM.querySelector(".modal-title");
const modalDescDOM = modalDOM.querySelector(".modal-description");

export const handleModalOpen = ({ isSuccess, timeString }) => {
    modalDOM.classList.add("open");

    if (isSuccess) {
        modalTitleDOM.textContent = "성공";
        modalDescDOM.textContent = `${timeString}만에 성공하였습니다!`;
    } else {
        modalTitleDOM.textContent = "실패";
        modalDescDOM.textContent = "다시 시도해보세요~!";
    }
};

export const handleModalClose = (onModalClose) => {
    modalDOM.classList.remove("open");
    onModalClose?.();
};
