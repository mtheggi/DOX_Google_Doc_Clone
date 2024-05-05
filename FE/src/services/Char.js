export default class Char {
    siteId;
    value;
    counter;
    fractionIndex;

    constructor(siteId, value, counter, fractionIndex) {
        console.log("Char Constructor fraction: , ", fractionIndex)
        this.siteId = siteId;
        this.value = value;
        this.counter = counter;
        this.fractionIndex = fractionIndex;

    }

}

