package com.dox_google_doc_clone.dox_google_doc_clone.Controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.dox_google_doc_clone.dox_google_doc_clone.Dto.SharedDocument;
import com.dox_google_doc_clone.dox_google_doc_clone.Models.User;
import com.dox_google_doc_clone.dox_google_doc_clone.Models.UserPermissions;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.UserPermissionsService;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.UserService;
import com.dox_google_doc_clone.dox_google_doc_clone.config.JwtService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.DocumentModel;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.DocumentService;

import javax.print.Doc;

@CrossOrigin(origins = "*")
@RestController
public class DocumentController {
    private DocumentService documentService;
    private UserPermissionsService userPermissionsService;
    private JwtService jwtService;
    private UserService userService;

    public DocumentController(DocumentService documentService, UserPermissionsService userPermissionsService,
            JwtService jwtService, UserService userService) {
        this.documentService = documentService;
        this.userPermissionsService = userPermissionsService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @GetMapping("/user/documents")
    public List<DocumentModel> getMethodName() {
        return documentService.getAllDocument();
    }

    @PostMapping("/document/create")
    public ResponseEntity<String> saveDocument(@RequestBody JsonNode jsonNode,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        String userId;
        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }
        String title = jsonNode.get("title").asText();
        String content = jsonNode.get("content").asText();
        if (content == null || title == null || userId == null) {
            return new ResponseEntity<>("userId , title , content are required", HttpStatus.BAD_REQUEST);
        }
        DocumentModel documentModel = documentService
                .saveDocument(new DocumentModel(title, content, LocalDateTime.now()));
        UserPermissions userPermissions = new UserPermissions(userId, documentModel.getId(), true, true, true);
        userPermissionsService.saveUserPermissions(userPermissions);

        return new ResponseEntity<>("document created successfully", HttpStatus.OK);
    }

    @PutMapping("/document/share")
    public ResponseEntity<String> shareDocument(@RequestBody JsonNode jsonNode) {
        System.out.println(jsonNode.toString());

        boolean isShared = documentService.shareDocument(jsonNode);
        if (isShared) {
            return new ResponseEntity<>("Document has been shared", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("invalid User name or invalid documentId or incomplete parameters  ",
                    HttpStatus.BAD_REQUEST);

        }
    }

    @GetMapping("/document/owned/{page_num}")
    public ResponseEntity<List<DocumentModel>> getOwnedDocuments(@PathVariable int page_num,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        String userId;
        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
        } else {
            List<DocumentModel> emptyList = new ArrayList<>();
            return new ResponseEntity<>(emptyList, HttpStatus.BAD_REQUEST);
        }

        List<DocumentModel> list = documentService.getOwnedDocuments(userId, page_num);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/document/shared/{page_num}")
    public ResponseEntity<List<SharedDocument>> getSharedDocuments(@PathVariable int page_num,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        String userId;
        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
        } else {
            List<SharedDocument> emptyList = new ArrayList<>();
            return new ResponseEntity<>(emptyList, HttpStatus.BAD_REQUEST);
        }

        List<SharedDocument> list = documentService.getSharedDocuments(userId, page_num);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
