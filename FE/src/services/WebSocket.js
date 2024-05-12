import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { v1 as uuidv1 } from 'uuid';
import Delta from 'quill-delta';
import { siteId, CRDTinstance } from './CRDTS';
import Char from './Char';
import {baseUrl} from "../Constants"

const userId = siteId;
const socket = new SockJS(`${baseUrl}/ws`);
const client = Stomp.over(socket);

export const ConnectToWebSocket = async (quillRef) => {
    console.log("Connecting to WebSocket...");
    console.log("Client: ", client)

    const onError = (error) => {
        console.log("Error: ", error);
    };

    const onConnected = async () => {

        console.log("Socket Connected successfully");
        client.subscribe('/topic/public', function (data) {
            // check document_ID 
            // I should receive the message here and inserte to the CRDTs 
            // done : operation extracted from the forwared 
            // TODO: CRDTs 

            const quill = quillRef.current.getEditor();
            const op = JSON.parse(data.body);
            console.log("data ; ", data.body);


            if (op.documentId === CRDTinstance.documentId) {
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa333333333333333333333333333333");
                if (op.siteId !== siteId) {
                    let deltas;
                    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
                    if (op.operation === 'style') {
                        deltas = CRDTinstance.remoteChangeStyle(op);
                        console.log("remote style : , ", deltas);

                    } else if (op.operation === 'delete') {
                        const char = new Char(op.siteId, op.character, op.counter, op.fractionIndex, op.bold, op.italic);
                        console.log("recieved operation: ", op);
                        deltas = CRDTinstance.remoteDelete(char);

                    } else {
                        const char = new Char(op.siteId, op.character, op.counter, op.fractionIndex, op.bold, op.italic);

                        deltas = CRDTinstance.remoteInsert(char);
                        console.log("remoteInsert deltas: ", deltas);

                    }

                    quill.updateContents(deltas, 'silent');
                }
            }

        });
    };

    await client.connect({}, onConnected, onError);
}


export const sendmessage = async (operation) => {
    await client.send("/app/broadcast", {}, JSON.stringify(operation));
}

export const DisconnectWebSocket = () => {
    return () => {
        client.disconnect();
    }
}
