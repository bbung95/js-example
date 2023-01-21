export const makeDOMwithProperties = (domType, propertyMap) => {
    // TS의 필요성
    const dom = document.createElement(domType);
    Object.keys(propertyMap).map((key) => {
        dom[key] = propertyMap[key];
    });
    return dom;
};

export const appendChildrenList = (target, childrenList) => {
    // childrenList가 배열일 지 아닐 지 모름 -> 타입스크립트 필요
    if (!Array.isArray(childrenList)) return;

    const el = document.createDocumentFragment();
    childrenList.forEach((item) => {
        if (!item) return; // 추가
        el.appendChild(item);
    });

    target.appendChild(el);
};
