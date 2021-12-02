function CSSsetProperty_Fn(){
    const $target = document.querySelector(".visual-block");
    const t = gsap.getProperty(".visual-block", "height") - (gsap.getProperty(".visual-block", "padding-bottom") + gsap.getProperty(".visual-block", "padding-top")); 
    const n = .01 * (window.innerWidth, t);
    document.documentElement.style.setProperty("--vh", "".concat(n, "px"));
    document.documentElement.style.setProperty("--fullwidth", `${window.innerWidth}px`);
    document.documentElement.style.setProperty("--fullvh", `${window.innerHeight*0.01}px`);
}

function getPreviousSiblings(elem, filter) {
    let sibs = [];
    while (elem = elem.previousElementSibling) { //  previousSibling
        if (elem.nodeType === 3) continue; // ignore text nodes
        if (!filter || filter(elem)) sibs.push(elem);
    }
    return sibs;
}
function getNextSiblings(elem, filter) {
    let sibs = [];
    var nextElem = elem.parentNode.firstChild; // elem.nextElementSibling; elem.parentNode.firstChild;
    do {
        if (nextElem.nodeType === 3) continue; // ignore text nodes
        if (nextElem === elem) continue; // ignore elem of target
        if (nextElem === elem.nextElementSibling) {
            if (!filter || filter(elem)) {
                sibs.push(nextElem);
                elem = nextElem;
            }
        }
    } while(nextElem = nextElem.nextSibling  ) // nextElem.nextElementSibling
    return sibs;
}

function getElementIndex( selector ) {
    const ele = document.querySelector( selector )
    return [].indexOf.call(ele.parentNode.children, ele);
}

export {
    getPreviousSiblings, getNextSiblings, getElementIndex, CSSsetProperty_Fn
};