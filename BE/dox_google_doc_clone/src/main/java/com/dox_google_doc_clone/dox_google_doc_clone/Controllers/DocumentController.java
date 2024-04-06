package com.dox_google_doc_clone.dox_google_doc_clone.Controllers;

import java.util.List;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.UserPermissions;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.UserPermissionsService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.DocumentModel;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.DocumentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/")
public class DocumentController {
    private DocumentService documentService;
    private UserPermissionsService userPermissionsService;
    public DocumentController(DocumentService documentService, UserPermissionsService userPermissionsService) {
        this.documentService = documentService;
        this.userPermissionsService = userPermissionsService;
    }

    @GetMapping("/user/documents")
    public List<DocumentModel> getMethodName() {
        return documentService.getAllDocument();
    }

    @PostMapping("/document/create")
    public ResponseEntity<String> saveDocument(@RequestBody JsonNode jsonNode) {
        String userId = jsonNode.get("userId").asText();
        String title = jsonNode.get("title").asText();
        String content = jsonNode.get("content").asText();
        if (content == null || title == null || userId == null) {
            return new ResponseEntity<>("userId , title , content are required" , HttpStatus.BAD_REQUEST);
        }

        DocumentModel documentModel = documentService.saveDocument(new DocumentModel(title, content));
        UserPermissions userPermissions = new UserPermissions(userId ,documentModel.getId(), true, true, true);
        userPermissionsService.saveUserPermissions(userPermissions);

        return new ResponseEntity<>("document created successfully", HttpStatus.OK);
    }
    @PostMapping("/document/share")
    public ResponseEntity<String> shareDocument(@RequestBody JsonNode jsonNode) {
        System.out.println(jsonNode.toString());

        boolean isShared = documentService.shareDocument(jsonNode);
        if(isShared){
            return new ResponseEntity<>("Document has been shared", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("invalid User name or invalid documentId or incomplete parameters  ", HttpStatus.BAD_REQUEST);

        }
    }



}
