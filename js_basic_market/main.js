import { getListSection } from "./module/productSection.js";

/* 콜백함수 사용
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
*/

// async await 사용
try {
    const result = await fetch("./public/mock/sectionListData.json");
    const data = await result.json();
    const sectionInfoList = data.sectionInfoList;

    sectionInfoList.forEach((item) => {
        document.body.appendChild(getListSection(item.sectionTitle, item.productList));
    });
} catch (error) {
    console.log(error);
}
