
import { v1 as uuidv1 } from 'uuid';
export const siteId = uuidv1();
import Char from './Char';
import { sendmessage } from './WebSocket';
//convert String to crts obecjt
//Structure of crts object

//insert and detele
export function convertDeltaToCrdt(delta) {
    const crdtOperations = [];

    // let index = 0;
    let insertIndx = 0;
    for (const op of delta.ops) {
        if (op.retain) {
            // For insert operations, add a CRDT insert operation for each character
            insertIndx = op.retain;
        }
        if (op.insert) {
            crdtOperations.push({ type: 'insert', index: insertIndx, char: op.insert });
        }

        if (op.delete) {
            // For delete operations, add a CRDT delete operation for each deleted character
            crdtOperations.push({ type: 'delete', index: insertIndx });
        }
    }
    console.log("LAst Element of the crdtOperations")
    console.log(crdtOperations);
    const lastElement = crdtOperations[crdtOperations.length - 1];
    console.log(lastElement)
    return { operation: lastElement?.type, documentId: "12", character: lastElement?.char, index: lastElement?.index };
}


export class CRDTs {
    siteId;
    counter;
    sequence = [];

    constructor() {
        this.siteId = siteId;
        this.counter = 0;
        this.sequence = [];
    }

    static CRDTinstance = null;
    // The static method that controls access to the singleton instance
    static getInstance() {
        if (!CRDTs.CRDTinstance) {
            CRDTs.CRDTinstance = new CRDTs();
        }

        return CRDTs.CRDTinstance;
    }

    localInsert(value, index) {
        /*
            private String operation;
            private String documentId;
            private String character;
            private String siteId;
            private int counter; // index of the character in the document
            private float fractionIndex;
        */
        this.counter++;

        console.log("localInsert , ", value, " , ", index);
        if (this.sequence.length === 0 || index >= this.sequence.length) {

            const char = new Char(this.siteId, value, this.counter, index)
            this.sequence.push(char);
            console.log("HERE we need to stop", char);
            // TODO:get access to documentId
            const operation = { operation: 'insert', documentId: "1", character: value, siteId: this.siteId, counter: this.counter, fractionIndex: index };
            sendmessage(operation);
            return;
        }

        let afterPosition = this.sequence[index].fractionIndex;
        let beforePosition = this.sequence[index - 1].fractionIndex;


        const fractionIndex = (afterPosition + beforePosition) / 2;
        const char = new Char(this.siteId, value, this.counter, fractionIndex);
        this.sequence.splice(index, 0, char);
        const operation = { operation: 'insert', documentId: "1", character: value, siteId: this.siteId, counter: this.counter, fractionIndex: fractionIndex };
        sendmessage(operation);

    }
    localDelete(index) {
        this.counter++;
        const char = this.sequence[index];
        const operation = { operation: 'delete', documentId: "1", character: char.value, siteId: char.siteId, counter: char.counter, fractionIndex: char.fractionIndex }
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

        const { fractionIndex } = char
        let index = this.getFirstIndex(fractionIndex)
        if (index === -1) {

            index = this.sequence.push(char);

            // deltas that will be sent quill 
            // 
            return { ops: [{ retain: index }, { insert: char.value }] }
        }

        this.sequence.splice(index, 0, char);
        if (index) {
            return { ops: [{ retain: index }, { insert: char.value }] }
        } else {
            return { ops: [{ insert: char.value }] }
        }

    }
    getIndex(fractionIndex) {
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
        const index = this.getIndex(fractionIndex);
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