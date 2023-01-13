import { makeDOMwithProperties, appendChildrenList } from "../utils/dom.js";
import { getCartToggleBtn } from "./cartToggleButton.js";

export const getProductCard = (productInfo) => {
    const { imgSrc, name, discountPercent, price, originalPrice } = productInfo;

    const productCard = makeDOMwithProperties("div", {
        className: "product-card",
    });

    // --- productImgCon ---
    const productImgCon = makeDOMwithProperties("div", {
        className: "product-image-con",
    });
    // --- productImage ---
    const productImage = makeDOMwithProperties("img", {
        src: imgSrc,
        alt: name,
    });

    // --- cartBtn ---
    const cartToggleBtn = getCartToggleBtn(productInfo);
    // --- end ---

    // --- productDescription ---
    const productDescription = makeDOMwithProperties("div", {
        className: "product-name",
    });

    const productName = makeDOMwithProperties("div", {
        className: "product-name",
        textContent: name,
    });

    const productPriceCon = makeDOMwithProperties("div", {
        className: "product-price-con",
    });
    const productDiscountPercent = makeDOMwithProperties("div", {
        className: "product-discount-percent",
        textContent: `${discountPercent}%`,
    });
    const productPrice = makeDOMwithProperties("div", {
        className: "product-price",
        textContent: `${price.toLocaleString()}원`,
    });

    const productOriginalPrice = makeDOMwithProperties("div", {
        className: "product-original-price",
        textContent: `${originalPrice.toLocaleString()}원`,
    });
    // --- end ---

    appendChildrenList(productPriceCon, [productDiscountPercent, productPrice]);
    appendChildrenList(productDescription, [productName, productPriceCon, productOriginalPrice]);

    appendChildrenList(productImgCon, [productImage, cartToggleBtn]);
    appendChildrenList(productCard, [productImgCon, productDescription]);

    return productCard;
};
