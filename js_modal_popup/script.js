(function () {
    "use strict";
    const get = (target) => {
        return document.querySelector(target);
    };

    const $body = get("body");

    /**
     *  toggle을 사용한 modal popup
     */
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

    /**
     * dialog를 이용한 modal popup
     */
    const $dialogBtn = get(".dialog_open_button");
    const $dialog = get("dialog");
    const $dialogConfirmBtn = get(".dialog_button.confirm");
    const $dialogCloseBtn = get(".dialog_button.cancel");

    $dialogBtn.onclick = () => {
        $dialog.showModal();
        $body.classList.toggle("scroll_rock");
    };

    $dialog.onclose = () => $body.classList.toggle("scroll_rock");

    window.onclick = (e) => {
        if (e.target === $modal) toggleModal();
        if (e.target.nodeName === "DIALOG") $dialog.close();
    };
})();
