export const makeDOMwithProperties = (domType, propertyMap) => {
    // TS의 필요성
    const dom = document.createElement(domType);
    Object.keys(propertyMap).map((key) => {
        dom[key] = propertyMap[key];
    });
    return dom;
};

export const appendChildrenList = (target, childrenList) => {
    if (!Array.isArray(childrenList)) return;

    const el = document.createDocumentFragment();
    childrenList.forEach((item) => {
        el.appendChild(item);
    });

    target.appendChild(el);
};
