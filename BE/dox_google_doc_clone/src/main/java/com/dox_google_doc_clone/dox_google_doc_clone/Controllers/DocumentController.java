package com.dox_google_doc_clone.dox_google_doc_clone.Controllers;

import java.util.List;

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

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class DocumentController {
    private DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping("/user/documents")
    public List<DocumentModel> getMethodName() {
        return documentService.getAllDocument();
    }

    @PostMapping("/document/create")
    public ResponseEntity<DocumentModel> saveDocument(@RequestBody DocumentModel document) {
        System.err.println(document);
        if (document.getContent() == null || document.getTitle() == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        DocumentModel documentModel = documentService.saveDocument(document);
        return new ResponseEntity<>(documentModel, HttpStatus.OK);
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
