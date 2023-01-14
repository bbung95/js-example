import { getProductList } from "./module/productList.js";
import { getCartInfo } from "./module/cartToggleButton.js";
import { makeDOMwithProperties } from "./utils/dom.js";

const sectionDOM = document.querySelector("section");
const cartPayContainer = document.querySelector("#cart-pay-container");

const cartinfo = getCartInfo();

const reloadPage = () => location.reload();

if (cartinfo.length < 1) {
    const DOM = makeDOMwithProperties("div", {
        textContent: "장바구니에 상품이 없습니다.",
        className: "product-list-con",
    });
    sectionDOM.insertBefore(DOM, cartPayContainer);
} else {
    const productListDOM = getProductList(cartinfo, reloadPage);
    sectionDOM.insertBefore(productListDOM, cartPayContainer);
}
