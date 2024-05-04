import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { v1 as uuidv1 } from 'uuid';
import Delta from 'quill-delta';
import { siteId, CRDTinstance } from './CRDTS';

const userId = siteId;
const socket = new SockJS('http://localhost:8080/ws/');
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

            if (op.siteId !== siteId) {
                let deltas;
                if (op.operation === 'delete') {
                    deltas = CRDTinstance.remoteDelete(op.fractionIndex);

                } else {
                    deltas = CRDTinstance.remoteInsert(op.character, op.fractionIndex);
                }

                quill.updateContents(deltas, 'silent');
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
