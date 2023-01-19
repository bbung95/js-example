import { fetchSectionListData } from "./module/fetch.js";
import { setButtonEvent, setFilterEvent } from "./module/productFilter.js";
import { getProductList } from "./module/productList.js";

const sectionDOM = document.querySelector("section");

const sectionInfoList = await fetchSectionListData();
const productList = sectionInfoList.reduce((prev, curr) => [...prev, ...curr.productList], []);

const productListDOM = getProductList(productList);

sectionDOM.appendChild(productListDOM);

setButtonEvent(productList);
setFilterEvent();
