
import { v1 as uuidv1 } from 'uuid';
export const siteId = uuidv1();
import Char from './Char';
import { sendmessage } from './WebSocket';
import { generateKeyBetween } from 'fractional-indexing';
import { cursors } from './WebSocket';


//convert String to crts obecjt
//Structure of crts object

//insert and detele
export function convertDeltaToCrdt(delta) {
    const crdtOperations = [];
    // ops:[]
    // let index = 0;
    let insertIndx = 0;
    for (const op of delta.ops) {
        if (op.retain) {
            // For insert operations, add a CRDT insert operation for each character
            insertIndx = op.retain;
        }
        if (op.insert) {
            if (op.attributes) {
                // For insert operations, add a CRDT insert operation for each character
                crdtOperations.push({ type: 'insert', index: insertIndx, char: op.insert, attributes: op.attributes });
            } else {
                crdtOperations.push({ type: 'insert', index: insertIndx, char: op.insert });
            }
        }
        if (op.delete) {
            // For delete operations, add a CRDT delete operation for each deleted character
            crdtOperations.push({ type: 'delete', index: insertIndx });
        }
    }

    const lastElement = crdtOperations[crdtOperations.length - 1];
    console.log("lastElement : ", lastElement);
    return { operation: lastElement?.type, documentId: "12", character: lastElement?.char, index: lastElement?.index, attributes: lastElement?.attributes };
}


export class CRDTs {
    siteId;
    documentId;
    counter;
    sequence = [];

    constructor() {
        this.siteId = siteId;
        this.counter = 0;
        this.documentId = null;
        this.sequence = [];
    }

    setDocumentId(docid) {
        this.documentId = docid;
    }

    static CRDTinstance = null;
    // The static method that controls access to the singleton instance
    static getInstance() {
        if (!CRDTs.CRDTinstance) {
            CRDTs.CRDTinstance = new CRDTs();
        }

        return CRDTs.CRDTinstance;
    }


    clearSequence() {
        this.sequence = [];
    }


    constructTheSequence(content) {
        let index = 0;
        let isItalic = false;
        let isBold = false;
        let prevKey = generateKeyBetween(null, null);

        for (let i = 0; i < content.length; i++) {
            if (content.substring(i, i + 8) === '<strong>') {
                isBold = true;
                i += 7;
                continue;
            }
            if (content.substring(i, i + 9) === '</strong>') {
                isBold = false;
                i += 8;
                continue;
            }
            if (content.substring(i, i + 4) === '<em>') {
                isItalic = true;
                i += 3;
                continue;
            }
            if (content.substring(i, i + 5) === '</em>') {
                isItalic = false;
                i += 4;
                continue;
            }
            if (content.substring(i, i + 3) === '<p>') {
                i += 2;
                continue;
            }
            if (content.substring(i, i + 4) === '</p>') {
                i += 3;
                const char = new Char(this.siteId, '\n', this.counter, prevKey, isItalic, isBold);
                this.sequence.push(char);
                index++;
                this.counter++;
                prevKey = generateKeyBetween(prevKey, null);
                continue;
            }
            if (content.substring(i, i + 4) === '<br>') {
                i += 3;
                const char = new Char(this.siteId, '\n', this.counter, prevKey, isItalic, isBold);
                this.sequence.push(char);
                index++;
                this.counter++;
                prevKey = generateKeyBetween(prevKey, null);
                continue;
            }
            const char = new Char(this.siteId, content[i], this.counter, prevKey, isItalic, isBold);
            this.sequence.push(char);
            index++;
            this.counter++;
            prevKey = generateKeyBetween(prevKey, null);
        }


        // console.log("Sequence Constructed : , ", this.sequence);

    }

    localInsert(value, index, attributes, documentId) {
        /*
            private String operation;
            private String documentId;
            private String character;
            private String siteId;
            private int counter; // index of the character in the document
            private float fractionIndex;
        */
        this.counter++;

        var isItalic = false;
        var isBold = false;
        if (typeof attributes !== 'undefined') {
            if (attributes.italic) {
                isItalic = attributes.italic;
            }
            if (attributes.bold) {
                isBold = attributes.bold;
            }
        }

        if (this.sequence.length === 0 || index >= this.sequence.length) {

            let newKey;
            if (this.sequence.length === 0) {
                newKey = generateKeyBetween(null, null);
            } else {
                newKey = generateKeyBetween(this.sequence[this.sequence.length - 1].fractionIndex, null);
            }

            const char = new Char(this.siteId, value, this.counter, newKey, isBold, isItalic)
            this.sequence.push(char);
            const operation = { operation: 'insert', documentId: documentId, character: value, siteId: this.siteId, counter: this.counter, fractionIndex: newKey, bold: isBold, italic: isItalic };
            console.log("localInsert operation : ", operation);
            sendmessage(operation);
            return;
        }

        let afterPosition = this.sequence[index].fractionIndex;
        let beforePosition = index === 0 ? null : this.sequence[index - 1].fractionIndex;
        const fractionIndex = generateKeyBetween(beforePosition, afterPosition);
        const char = new Char(this.siteId, value, this.counter, fractionIndex, isBold, isItalic);
        console.log("localInsert in Index , ", index)
        this.sequence.splice(index, 0, char);
        "1"
        const operation = { operation: 'insert', documentId: documentId, character: value, siteId: this.siteId, counter: this.counter, fractionIndex: fractionIndex, bold: isBold, italic: isItalic };

        console.log("localInsert operation : ", operation);
        sendmessage(operation);

    }

    localChangeStyle(delta, documentId) {
        let index = delta.ops[0].retain;
        const isconvertBold = delta.ops.some(op => (op.attributes?.hasOwnProperty('bold') && !op.hasOwnProperty('insert')));
        const isconvertItalic = delta.ops.some(op => (op.attributes?.hasOwnProperty('italic') && !op.hasOwnProperty('insert')));
        if (isconvertBold) {
            if (delta.ops.length === 2)
                this.sequence[index].bold = delta.ops[1].attributes.bold ? true : false;
            else
                this.sequence[index].bold = delta.ops[0].attributes.bold ? true : false;

            const operation = { operation: 'style', documentId: documentId, character: this.sequence[index].value, siteId: this.siteId, counter: this.sequence[index].counter, fractionIndex: this.sequence[index].fractionIndex, bold: this.sequence[index].bold, italic: null };
            sendmessage(operation);
            return;
        }
        if (isconvertItalic) {

            if (delta.ops.length === 2)
                this.sequence[index].italic = delta.ops[1].attributes.italic ? true : false;
            else
                this.sequence[index].italic = delta.ops[0].attributes.italic ? true : false;

            const operation = { operation: 'style', documentId: documentId, character: this.sequence[index].value, siteId: this.siteId, counter: this.sequence[index].counter, fractionIndex: this.sequence[index].fractionIndex, bold: null, italic: this.sequence[index].italic };

            sendmessage(operation);
            return;

        }
    }

    remoteChangeStyle(operation) {
        const { fractionIndex } = operation;
        const index = this.getDeleteIndex(fractionIndex);
        console.log("remote recived Style Change ,", operation);

        if (index != -1) {
            if (operation.bold !== null) {
                this.sequence[index].bold = operation.bold;
                return { ops: [{ retain: index }, { retain: 1, attributes: { bold: operation.bold ? true : null } }] }
            } else {
                this.sequence[index].italic = operation.italic;
                return { ops: [{ retain: index }, { retain: 1, attributes: { italic: operation.italic ? true : null } }] }

            }
        }
    }

    localDelete(index, documentId) {
        this.counter++;
        const char = this.sequence[index];
        const operation = { operation: 'delete', documentId: documentId, character: char.value, siteId: this.siteId, counter: char.counter, fractionIndex: char.fractionIndex }
        this.sequence.splice(index, 1);

        sendmessage(operation);
    }

    getFirstIndex(fractionIndex) {
        // get first index in the sequence where thre fractionalIndex is greater that the index ; 
        let startIndx = 0;
        let endIndx = this.sequence.length - 1;
        let midIndx;
        while (startIndx <= endIndx) {
            midIndx = Math.floor((startIndx + endIndx) / 2);
            if (this.sequence[midIndx].fractionIndex <= fractionIndex) {
                startIndx = midIndx + 1;
            } else {
                endIndx = midIndx - 1;
            }
        }
        // return negative one if the the fractionIndex is greater than all of them . 

        return startIndx < this.sequence.length ? startIndx : -1;
    }
    remoteInsert(char) {
        //TODO : shoudl I increment the coutner in remoteInsert ????? 

        const attributes = { bold: char.bold, italic: char.italic }
        console.log("remoteInsert char :", char);

        const { fractionIndex } = char
        let index = this.getFirstIndex(fractionIndex)
        if (index === -1 && this.sequence.length > 0) {

            index = this.sequence.push(char);
            return { ops: [{ retain: this.sequence.length - 1 }, { insert: char.value, attributes: attributes }] }
        }

        if (index === -1) {

            index = this.sequence.push(char);

            return { ops: [{ insert: char.value, attributes: attributes }] }
        }

        this.sequence.splice(index, 0, char);
        if (index) {
            console.log("remoteInsert in Index , ", index)
            return { ops: [{ retain: index }, { insert: char.value, attributes: attributes }] }
        } else {
            return { ops: [{ insert: char.value, attributes: attributes }] }
        }

    }
    getDeleteIndex(fractionIndex) {
        let startIndx = 0;
        let endIndx = this.sequence.length - 1;
        let midIndx;
        while (startIndx <= endIndx) {
            midIndx = Math.floor((startIndx + endIndx) / 2);

            if (this.sequence[midIndx].fractionIndex === fractionIndex) { return midIndx; }

            if (this.sequence[midIndx].fractionIndex < fractionIndex) {
                startIndx = midIndx + 1;
            } else {
                endIndx = midIndx - 1;
            }
        }
        return -1; // the fractionIndex is not in the sequence
    }
    remoteDelete(char) {
        const { fractionIndex } = char;
        console.log("remoteDelete char :", char);
        const index = this.getDeleteIndex(fractionIndex);
        console.log("At Index :", index);
        if (index != -1) {
            this.sequence.splice(index, 1);
            if (index === 0) {
                return { ops: [{ delete: 1 }] }
            } else {
                return { ops: [{ retain: index }, { delete: 1 }] }
            }
        }

    }

}

export const CRDTinstance = CRDTs.getInstance();