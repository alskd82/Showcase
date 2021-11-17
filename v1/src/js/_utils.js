function getPreviousSiblings(elem, filter) {
    let sibs = [];
    while (elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; // ignore text nodes
        if (!filter || filter(elem)) sibs.push(elem);
    }
    return sibs;
}
function getNextSiblings(elem, filter) {
    let sibs = [];
    var nextElem = elem.parentNode.firstChild;
    do {
        if (nextElem.nodeType === 3) continue; // ignore text nodes
        if (nextElem === elem) continue; // ignore elem of target
        if (nextElem === elem.nextElementSibling) {
            if (!filter || filter(elem)) {
                sibs.push(nextElem);
                elem = nextElem;
            }
        }
    } while(nextElem = nextElem.nextSibling)
    return sibs;
}

export {
    getPreviousSiblings, getNextSiblings
};