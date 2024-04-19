import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const socket = new SockJS('http://localhost:8080/ws/');
const client = Stomp.over(socket);

export const ConnectToWebSocket = async () => {
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
            console.log("message Received from server:")
            console.log(JSON.parse(data.body));
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
