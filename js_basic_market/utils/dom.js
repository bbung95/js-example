export const makeDOMwithProperties = (domType, propertyMap) => {
    // domType : div, a, li...
    // propertyMap : {"className" : ""}
    // Objcet.keys(propertyMap) -> ["className", alt]

    const dom = document.createElement(domType);
    Object.keys(propertyMap).forEach((key) => {
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
