package com.dox_google_doc_clone.dox_google_doc_clone.Controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.dox_google_doc_clone.dox_google_doc_clone.Dto.DocumentWithPermissions;
import com.dox_google_doc_clone.dox_google_doc_clone.Models.DocumentModel;
import com.dox_google_doc_clone.dox_google_doc_clone.Models.DocumentVersionTable;
import com.dox_google_doc_clone.dox_google_doc_clone.Models.UserPermissions;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.DocumentService;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.DocumentVersionService;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.UserPermissionsService;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.UserService;
import com.dox_google_doc_clone.dox_google_doc_clone.config.JwtService;
import com.dox_google_doc_clone.dox_google_doc_clone.crdts.ManagerOfCRDTS;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "*")
@RestController
public class DocumentVersionController {
    private DocumentService documentService;
    private DocumentVersionService documentVersionService;
    private UserPermissionsService userPermissionsService;
    private JwtService jwtService;
    private UserService userService;
    private ManagerOfCRDTS managerOfCRDTS = ManagerOfCRDTS.getInstance();

    public DocumentVersionController(DocumentService documentService, UserPermissionsService userPermissionsService,
            JwtService jwtService, UserService userService, DocumentVersionService documentVersionService) {
        this.documentService = documentService;
        this.userPermissionsService = userPermissionsService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.documentVersionService = documentVersionService;
    }

    @GetMapping("/documentversion/get/{documentId}")
    public ResponseEntity<List<String>> getMethodName(@RequestParam String documentId,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        String userId;

        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        List<String> documentVersions = documentVersionService.getDocumentVersionByDocumentId(documentId)
                .getDocumentVersions();
        return new ResponseEntity<>(documentVersions, HttpStatus.OK);
    }

    @GetMapping("/documentversion/get/{documentId}/{version}")
    public ResponseEntity<DocumentWithPermissions> getMethodName(@PathVariable String documentId,
            @PathVariable int version,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        String userId;
        UserPermissions userPermissions;
        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
            userPermissions = userPermissionsService.getUserPermissionByDocumentIdAndUserId(userId, documentId);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        DocumentVersionTable documentVersionTable = documentVersionService.getDocumentVersionByDocumentId(documentId);
        List<String> temp = documentVersionTable.getDocumentVersions();
        if (userPermissions.isOwner() || userPermissions.isEdit()) {
            managerOfCRDTS.addCRDTS(documentId, temp.get(version));
        }
        DocumentModel documentModel = documentService.getDocumentModel(documentId);
        documentModel.setContent(temp.get(version));
        DocumentWithPermissions documentWithPermissions = new DocumentWithPermissions(
                documentModel.getId(), documentModel.getTitle(), documentModel.getContent(),
                documentModel.getOwnername(), documentModel.getCreatedAt(), userPermissions.isOwner(),
                userPermissions.isEdit(), userPermissions.isViewOnly());
        return new ResponseEntity<DocumentWithPermissions>(documentWithPermissions, HttpStatus.OK);
    }

    @GetMapping("delete/documentversion/{documentId}/{version}")
    public ResponseEntity<Void> deleteVersionNumber(@PathVariable String documentId, @PathVariable String version,
            @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        String userId;

        if (userService.getUserByEmail(email).isPresent()) {
            userId = userService.getUserByEmail(email).get().getId();
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        documentVersionService.deleteDocumentVersion(documentId, version);
        return ResponseEntity.noContent().build();
    }

}