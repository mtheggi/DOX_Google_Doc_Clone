package com.dox_google_doc_clone.dox_google_doc_clone.Controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.dox_google_doc_clone.dox_google_doc_clone.Dto.DocumentAndOwnerName;
import com.dox_google_doc_clone.dox_google_doc_clone.Dto.SharedDocument;
import com.dox_google_doc_clone.dox_google_doc_clone.Models.User;
import com.dox_google_doc_clone.dox_google_doc_clone.Models.UserPermissions;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.UserPermissionsService;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.UserService;
import com.dox_google_doc_clone.dox_google_doc_clone.config.JwtService;
import com.dox_google_doc_clone.dox_google_doc_clone.crdts.ManagerOfCRDTS;
import com.fasterxml.jackson.databind.JsonNode;

import org.bson.Document;
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
    private ManagerOfCRDTS managerOfCRDTS = ManagerOfCRDTS.getInstance();

    public DocumentController(DocumentService documentService, UserPermissionsService userPermissionsService,
            JwtService jwtService, UserService userService) {
        this.documentService = documentService;
        this.userPermissionsService = userPermissionsService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping("/document/create")
    public ResponseEntity<?> saveDocument(@RequestBody JsonNode jsonNode,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        String userId;
        User user = null;
        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
            user = userService.getUserByEmail(email).get();
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }
        String title = jsonNode.get("title").asText();
        String content = jsonNode.get("content").asText();
        if (content == null || title == null || userId == null) {
            return new ResponseEntity<>("userId , title , content are required", HttpStatus.BAD_REQUEST);
        }
        DocumentModel documentModel = documentService
                .saveDocument(new DocumentModel(title, content, LocalDateTime.now(), user.getRealUserName()));
        UserPermissions userPermissions = new UserPermissions(userId, documentModel.getId(), true, true, true);
        userPermissionsService.saveUserPermissions(userPermissions);

        return new ResponseEntity<>(documentModel, HttpStatus.OK);
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

    @GetMapping("/document/{doc_id}")
    public ResponseEntity<DocumentModel> getDocumentByID(@PathVariable String doc_id,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        String userId;
        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
        } else {
            DocumentModel emptyList = null;
            return new ResponseEntity<>(emptyList, HttpStatus.BAD_REQUEST);
        }

        DocumentModel temp = documentService.getDocumentModel(doc_id);
        managerOfCRDTS.addCRDTS(doc_id, temp.getContent());

        return new ResponseEntity<>(temp, HttpStatus.OK);
    }

    @GetMapping("/document/save/{doc_id}")
    public ResponseEntity saveDocumentByID(@PathVariable String doc_id,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        String userId;
        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String content = managerOfCRDTS.SavedInDB(doc_id);
        documentService.saveDocument(doc_id, content);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/document/shared/{page_num}")
    public ResponseEntity<List<SharedDocument>> getSharedDocuments(@PathVariable int page_num,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        String userId;
        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
        } else {
            List<SharedDocument> emptyList = null;
            return new ResponseEntity<>(emptyList, HttpStatus.BAD_REQUEST);
        }

        List<SharedDocument> list = documentService.getSharedDocuments(userId, page_num);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/document/all/{page_num}")
    public ResponseEntity<List<DocumentModel>> getSAllDocuments(@PathVariable int page_num,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        String userId;

        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
        } else {
            List<DocumentModel> emptyList = new ArrayList<>();
            return new ResponseEntity<>(emptyList, HttpStatus.BAD_REQUEST);
        }

        List<DocumentModel> list = documentService.getAllDocuments(userId, page_num);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PutMapping("/document/rename/{documentId}")
    public ResponseEntity<DocumentModel> renameDocument(@PathVariable String documentId, @RequestBody JsonNode jsonNode,
            @RequestHeader("Authorization") String token) {

        String email = jwtService.extractEmail(token.substring(7));
        String userId;
        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        UserPermissions userPermissions = userPermissionsService.getUserPermissionByDocumentIdAndUserId(documentId,
                userId);

        if (userPermissions != null && (userPermissions.isEdit() || userPermissions.isOwner())) {
            DocumentModel documentModel = documentService.renameDocument(documentId, jsonNode.get("title").asText());
            if (documentModel == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>(documentModel, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
