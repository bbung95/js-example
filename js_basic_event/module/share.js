const shareURLBtn = document.querySelector("#url-share-button");

export const setShareURLBtn = () => {
    shareURLBtn.onclick = () => {
        navigator.clipboard.writeText(location.href).then(() => {
            alert("URL이 복사되었습니다.");
        });
    };
};
