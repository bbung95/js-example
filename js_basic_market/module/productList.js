import { makeDOMwithProperties } from "../utils/dom.js";
import { getProductCard } from "./productCard.js";

export const getProductList = (productInfoList, reloadPageCallBack) => {
    if (productInfoList == null || !Array.isArray(productInfoList)) return;

    const productList = makeDOMwithProperties("div", {
        className: "product-list-con",
    });

    const el = document.createDocumentFragment();
    productInfoList.forEach((item) => {
        const productCard = getProductCard(item, reloadPageCallBack);
        el.appendChild(productCard);
    });

    productList.appendChild(el);

    return productList;
};
