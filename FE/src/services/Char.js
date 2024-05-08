export default class Char {
    siteId;
    value;
    counter;
    fractionIndex;
    isItalic;
    isBold;
    constructor(siteId, value, counter, fractionIndex, isItalic, isBold) {
        console.log("Char Constructor fraction: , ", fractionIndex)
        this.siteId = siteId;
        this.value = value;
        this.counter = counter;
        this.fractionIndex = fractionIndex;
        this.isItalic = isItalic;
        this.isBold = isBold;
    }

}

