package com.dox_google_doc_clone.dox_google_doc_clone.Controllers;

import com.dox_google_doc_clone.dox_google_doc_clone.Dto.OperationMsg;
import com.dox_google_doc_clone.dox_google_doc_clone.crdts.CharItem;
import com.dox_google_doc_clone.dox_google_doc_clone.crdts.ManagerOfCRDTS;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class Socket {

    private static ManagerOfCRDTS managerOfCRDTS = ManagerOfCRDTS.getInstance();

    @MessageMapping("/broadcast")
    @SendTo("/topic/public")
    public OperationMsg broadcast(@Payload OperationMsg operationMsg) {
        System.err.println(operationMsg.toString());
        if (operationMsg.getOperation().equals("insert")) {
            CharItem temp = new CharItem(operationMsg.getCharacter(), operationMsg.getFractionIndex(),
                    operationMsg.getBold(), operationMsg.getItalic());
            managerOfCRDTS.insert(operationMsg.getDocumentId(), temp);
        } else if (operationMsg.getOperation().equals("delete")) {
            CharItem temp = new CharItem(operationMsg.getCharacter(), operationMsg.getFractionIndex(),
                    false, false);
            managerOfCRDTS.delete(operationMsg.getDocumentId(), temp);
        }

        return operationMsg;
    }

}
