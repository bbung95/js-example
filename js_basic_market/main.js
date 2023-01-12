import { getListSection } from "./module/productSection.js";

let listData;

const initListData = (data) => {
    listData = data.sectionInfoList;

    listData.forEach((item) => {
        document.body.appendChild(getListSection(item.sectionTitle, item.productList));
    });
};

fetch("./public/mock/sectionListData.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        initListData(data);
    });
