import { makeDOMwithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";

const MAX_PRICE = Number.MAX_VALUE;

const minPriceFilter = document.querySelector("#price-min-filter");
const maxPriceFilter = document.querySelector("#price-max-filter");
const discountFilter = document.querySelector("#discount-filter");
const filterBtn = document.querySelector(".product-filter-con").lastElementChild;

const coverterToPriceNumber = (value) => {
    const formattedString = value.replace("원", "").replace(",", "");
    const formattedNumber = Number(formattedString || 0);
    return (value = isNaN(formattedNumber) ? "" : formattedNumber);
};

const converterToPercentNumber = (value) => {
    const formattedString = value.replace("%", "");
    const formattedNumber = Number(formattedString || 0);
    return (value = isNaN(formattedNumber) ? "" : formattedNumber);
};

export const setButtonEvent = (productList) => {
    filterBtn.addEventListener("click", () => {
        const minPrice = coverterToPriceNumber(minPriceFilter.value) || 0;
        const maxPrice = coverterToPriceNumber(maxPriceFilter.value) || MAX_PRICE;
        const discountRate = converterToPercentNumber(discountFilter.value) || 0;

        const newProductList = productList.filter((item) => {
            const { price, discountPercent } = item;
            return price >= minPrice && price <= maxPrice && discountRate <= discountPercent;
        });

        const sectionDOM = document.querySelector("section");
        const originalProductListDOM = sectionDOM.querySelector(".product-list-con");
        sectionDOM.removeChild(originalProductListDOM);

        if (newProductList.length > 0) {
            const productListDOM = getProductList(newProductList);
            sectionDOM.appendChild(productListDOM);
        } else {
            const emptyProductListDOM = makeDOMwithProperties("div", {
                className: "product-list-con",
                textContent: "조건에 해당하는 상품이 없습니다.",
            });
            sectionDOM.appendChild(emptyProductListDOM);
        }
    });
};

const formatToPrice = (event) => {
    const price = event.target.value;
    const result = Number(price.replace(",", ""));
    if (isNaN(result)) {
        alert("숫자를 입력해주세요");
        event.target.value = 0;
        return;
    }

    event.target.value = `${result.toLocaleString()}원`;
};

export const setFilterEvent = () => {
    minPriceFilter.addEventListener("focus", (event) => coverterToPriceNumber(event.target.value));
    minPriceFilter.addEventListener("blur", formatToPrice);
    maxPriceFilter.addEventListener("focus", (event) => coverterToPriceNumber(event.target.value));
    maxPriceFilter.addEventListener("blur", formatToPrice);
    discountFilter.addEventListener("focus", (event) => converterToPercentNumber(event));
    discountFilter.addEventListener("blur", (event) => {
        const percent = event.target.value;
        const result = Number(percent.replace("%", ""));
        if (isNaN(result)) {
            alert("숫자를 입력해주세요");
            event.target.value = 0;
            return;
        }

        if (result < 0 || result > 100) {
            alert("0 이상 100 이하의 숫자를 입력해주세요.");
            event.target.value = 0;
            return;
        }

        event.target.value = `${result}%`;
    });
};
