package com.dox_google_doc_clone.dox_google_doc_clone.Controllers;

import com.dox_google_doc_clone.dox_google_doc_clone.Dto.OperationMsg;
import com.dox_google_doc_clone.dox_google_doc_clone.crdts.CRDTS;
import com.dox_google_doc_clone.dox_google_doc_clone.crdts.CharItem;
import com.dox_google_doc_clone.dox_google_doc_clone.crdts.LiveUsers;
import com.dox_google_doc_clone.dox_google_doc_clone.crdts.ManagerOfCRDTS;

import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class Socket {

    private static ManagerOfCRDTS managerOfCRDTS = ManagerOfCRDTS.getInstance();
    private static LiveUsers liveUsers = LiveUsers.getInstance();

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
        } else if (operationMsg.getOperation().equals("style")) {
            CRDTS tempSeq = managerOfCRDTS.geCrdts(operationMsg.getDocumentId());

            CharItem oldItem = tempSeq.search(operationMsg.getFractionIndex());

            CharItem tempChar = new CharItem(operationMsg.getCharacter(), operationMsg.getFractionIndex(),
                    operationMsg.getBold() != null ? operationMsg.getBold() : oldItem.bold,
                    operationMsg.getItalic() != null ? operationMsg.getItalic() : oldItem.italic);

            managerOfCRDTS.update(operationMsg.getDocumentId(), oldItem, tempChar);
        } else if (operationMsg.getOperation().equals("disconnect")) {
            liveUsers.removeValue(operationMsg.getDocumentId(), operationMsg.getUserName());
        }

        return operationMsg;
    }

}
