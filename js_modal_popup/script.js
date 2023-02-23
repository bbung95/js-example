(function () {
    "use strict";
    const get = (target) => {
        return document.querySelector(target);
    };

    const $body = get("body");
    const $modalBtn = get(".modal_open_button");
    const $modal = get(".modal");
    const $modalConfirmBtn = get(".modal_button.confirm");
    const $modalCloseBtn = get(".modal_button.cancel");

    const toggleModal = () => {
        $modal.classList.toggle("show");
        $body.classList.toggle("scroll_rock");
    };

    $modalBtn.onclick = () => toggleModal();

    $modalConfirmBtn.onclick = () => toggleModal();
    $modalCloseBtn.onclick = () => toggleModal();

    window.onclick = (e) => {
        if (e.target === $modal) toggleModal();
    };
})();
