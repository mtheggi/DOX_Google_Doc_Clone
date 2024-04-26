
//convert String to crts obecjt
//Structure of crts object

//insert and detele
function convertDeltaToCrdt(delta) {
    const crdtOperations = [];

    let index = 0;
    for (const op of delta.ops) {
        if (op.insert) {
            // For insert operations, add a CRDT insert operation for each character
            for (const char of op.insert) {
                crdtOperations.push({ type: 'insert', index, char });
                index++;
            }
        } else if (op.delete) {
            // For delete operations, add a CRDT delete operation for each deleted character
            for (let i = 0; i < op.delete; i++) {
                crdtOperations.push({ type: 'delete', index });
            }
        } else if (op.retain) {
            // For retain operations, just move the index forward
            index += op.retain;
        }
    }

    return crdtOperations;
}

class CharObject {
    _Char;
    _isBold;
    _position;
    _index;
    _isdeleted;
    _isItalic;
    get Char() {
        return this._Char;
    }
    set Char(value) {
        this._Char = value;
    }

    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }

    get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
    }

    get isdeleted() {
        return this._isdeleted;
    }
    set isdeleted(value) {
        this._isdeleted = value;
    }

    get isItalic() {
        return this._isItalic;
    }
    set isItalic(value) {
        this._isItalic = value;
    }

    get isBold() {
        return this._isBold;
    }
    set isBold(value) {
        this._isBold = value;
    }

    constructor(Char, position, index, isdeleted, isItalic, isBold) {
        this._Char = Char;
        this._position = position;
        this._index = index;
        this._isdeleted = isdeleted;
        this._isItalic = isItalic;
        this._isBold = isBold;
    }
    updateCharObject(CharObject) {
        this._Char = CharObject.Char();
        this._position = CharObject.position();
        this._index = CharObject.index();
        this._isdeleted = CharObject.isdeleted();
        this._isItalic = CharObject.isItalic();
        this._isBold = CharObject.isBold();
    }


}

function StringToCharObjectArray(string) {
    let CharObjectArray = [];
    for (let i = 0; i < string.length; i++) {
        CharObjectArray.push(new CharObject(string[i], i, i, false, false, false));
    }
    return CharObjectArray;
}

class CRDTsequence {
    CharObjectArray = [];

    constructor(string) {
        this.CharObjectArray = StringToCharObjectArray(string);
    }

}