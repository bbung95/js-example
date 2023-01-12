import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";

export const getListSection = (sectionTitle, productInfoList) => {
    const prodictListSection = makeDOMwithProperties("section", {
        className: "product-list-section",
    });

    const productSectionTitle = makeDOMwithProperties("div", {
        className: "section-title",
    });
    const titleHilight = makeDOMwithProperties("span", {
        className: "section-title-highlight",
    });
    const title = makeDOMwithProperties("span", {
        textContent: sectionTitle,
    });

    const productList = getProductList(productInfoList);

    appendChildrenList(productSectionTitle, [titleHilight, title]);
    appendChildrenList(prodictListSection, [productSectionTitle, productList]);

    return prodictListSection;
};
