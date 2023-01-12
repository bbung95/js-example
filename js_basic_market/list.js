import { getProductCard } from "./module/productCard.js";

const listSection = document.querySelector(".product-list-con");

let listData;

const initListData = (data) => {
    listData = data.sectionInfoList;
    console.log(listData);

    listData[0].productList.forEach((item) => {
        const productCard = getProductCard(item);
        listSection.appendChild(productCard);
    });
};

fetch("./public/mock/sectionListData.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        initListData(data);
    });
