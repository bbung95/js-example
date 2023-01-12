import { makeDOMwithProperties, appendChildrenList } from "./utils/dom.js";

const productCard = makeDOMwithProperties("div", {
    className: "product-card",
});

// --- productImgCon ---
const productImgCon = makeDOMwithProperties("div", {
    className: "product-image-con",
});
// --- productImage ---
const productImage = makeDOMwithProperties("img", {
    src: "./public/assets/파프리카.jpg",
    alt: "파프리카 2입",
});

// --- cartBtn ---
const cartToggleBtn = makeDOMwithProperties("button", {
    className: "cart-toggle-btn",
});
// --- cartImage ---
const cartImage = makeDOMwithProperties("img", {
    className: "cart-image",
    src: "./public/assets/cart.png",
});
cartToggleBtn.appendChild(cartImage);
// --- end ---

// --- productDescription ---
const productDescription = makeDOMwithProperties("div", {
    className: "product-name",
});

const productName = makeDOMwithProperties("div", {
    className: "product-name",
    textContent: "파프리카 2입",
});

const productPriceCon = makeDOMwithProperties("div", {
    className: "product-price-con",
});
const productDiscountPercent = makeDOMwithProperties("div", {
    className: "product-discount-percent",
    textContent: "20%",
});
const productPrice = makeDOMwithProperties("div", {
    className: "product-price",
    textContent: "2,000원",
});

const productOriginalPrice = makeDOMwithProperties("div", {
    className: "product-original-price",
    textContent: "2,500원",
});
// --- end ---

appendChildrenList(productPriceCon, [productDiscountPercent, productPrice]);
appendChildrenList(productDescription, [productName, productPriceCon, productOriginalPrice]);

appendChildrenList(productImgCon, [productImage, cartToggleBtn]);
appendChildrenList(productCard, [productImgCon, productDescription]);

document.querySelector("section").appendChild(productCard);
