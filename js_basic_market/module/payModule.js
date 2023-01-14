import { getCartInfo } from "./cartToggleButton.js";

const originalPriceDOM = document.querySelector("#original-price");
const discountPriceDOM = document.querySelector("#discount-price");
const deliveryPriceDOM = document.querySelector("#delivery-price");
const totalPriceDOM = document.querySelector("#total-price");

const DELIVERY_FREE_PRICE = 20000;
const DELIVERY_PRICE = 3000;

export const setPayInfo = () => {
    const cartInfo = getCartInfo();

    const { originalPrice, discountPrice } = cartInfo.reduce(
        (prev, curr) => {
            return {
                originalPrice: prev.originalPrice + curr.originalPrice,
                discountPrice: prev.discountPrice + (curr.originalPrice - curr.price),
            };
        },
        {
            originalPrice: 0,
            discountPrice: 0,
        }
    );

    let deliveryPrice = 0;
    let totalPrice = 0;

    const payPrice = originalPrice - discountPrice;
    if (payPrice < DELIVERY_FREE_PRICE) {
        deliveryPrice = DELIVERY_PRICE;
    }

    totalPrice = payPrice + deliveryPrice;

    originalPriceDOM.textContent = `${originalPrice.toLocaleString()}원`;
    discountPriceDOM.textContent = discountPrice ? `- ${discountPrice.toLocaleString()}원 ` : "0원";
    deliveryPriceDOM.textContent = deliveryPrice ? `+ ${deliveryPrice.toLocaleString()}원` : "0원";
    totalPriceDOM.textContent = `${totalPrice.toLocaleString()}원`;
};
