import { makeDOMwithProperties } from "../utils/dom.js";
import { CART_COOKIE_KEY } from "../constants/cart.js";

export const getCartInfo = () => JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];

const isInCart = ({ id }) => {
    const originalCartInfo = getCartInfo();

    return !!originalCartInfo.find((item) => item.id == id);
};

const addCartInfo = (productInfo) => {
    const originalCartInfo = getCartInfo();

    if (originalCartInfo.findIndex((item) => item.id === productInfo.id) !== -1) return;

    localStorage.setItem(CART_COOKIE_KEY, JSON.stringify([...originalCartInfo, productInfo]));
};

const removeCartInfo = ({ id }) => {
    const originalCartInfo = getCartInfo();

    localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(originalCartInfo.filter((item) => item.id !== id)));
};

export const getCartToggleBtn = (productInfo, reloadPageCallBack) => {
    let inCart = isInCart(productInfo);

    const cartToggleBtn = makeDOMwithProperties("button", {
        className: "cart-toggle-btn",
        type: "button",
        onclick: () => {
            if (inCart) {
                if (!confirm(`${productInfo.name}을 장바구니에서 삭제할까요?`)) return;
                removeCartInfo(productInfo);
                cartImage.src = "./public/assets/cart.png";
                reloadPageCallBack?.();
            } else {
                addCartInfo(productInfo);
                cartImage.src = "./public/assets/cartDisabled.png";
                if (confirm("장바구니에 담았습니다. 장바구니 페이지로 이동할까요?")) location.href = "./cart.html";
            }
            inCart = !inCart;
        },
    });
    // --- cartImage ---
    const cartImage = makeDOMwithProperties("img", {
        className: "cart-image",
        src: inCart ? "./public/assets/cartDisabled.png" : "./public/assets/cart.png",
    });
    cartToggleBtn.appendChild(cartImage);

    return cartToggleBtn;
};
