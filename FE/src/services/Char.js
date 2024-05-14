export default class Char {
    siteId;
    value;
    counter;
    fractionIndex;
    bold;
    italic;
    constructor(siteId, value, counter, fractionIndex, bold, italic) {
        // console.log("Char Constructor bolld italuc : , ", bold, italic)
        this.siteId = siteId;
        this.value = value;
        this.counter = counter;
        this.fractionIndex = fractionIndex;
        this.bold = bold;
        this.italic = italic;
    }

}

