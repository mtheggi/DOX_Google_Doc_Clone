package com.dox_google_doc_clone.dox_google_doc_clone.Controllers;

import com.dox_google_doc_clone.dox_google_doc_clone.Dto.OperationMsg;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class Socket {
    @MessageMapping("/broadcast")
    @SendTo("/topic/public")
    public OperationMsg broadcast( @Payload  OperationMsg operationMsg) {
        System.err.println("Operation: " + operationMsg.getOperation() + " DocumentId: " + operationMsg.getDocumentId() + " Character: " + operationMsg.getCharacter());
        return operationMsg;
    }



}
