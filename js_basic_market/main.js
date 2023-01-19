import { fetchSectionListData } from "./module/fetch.js";
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
const sectionInfoList = await fetchSectionListData();

sectionInfoList.forEach((item) => {
    document.body.appendChild(getListSection(item.sectionTitle, item.productList));
});
