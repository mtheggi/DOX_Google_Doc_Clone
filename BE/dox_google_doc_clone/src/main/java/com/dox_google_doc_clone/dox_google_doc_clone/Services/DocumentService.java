package com.dox_google_doc_clone.dox_google_doc_clone.Services;

import java.util.ArrayList;
import java.util.List;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.User;
import com.dox_google_doc_clone.dox_google_doc_clone.Models.UserPermissions;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dox_google_doc_clone.dox_google_doc_clone.Repositories.DocumentRepository;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.DocumentModel;

@Service
public class DocumentService {
    private final DocumentRepository DocumentRepository;
    private final UserService userService;
    private final UserPermissionsService userPermissionService;

    @Autowired
    public DocumentService(DocumentRepository DocumentRepository, UserService userService,
            UserPermissionsService userPermissionService) {
        this.DocumentRepository = DocumentRepository;
        this.userService = userService;
        this.userPermissionService = userPermissionService;
    }

    public List<DocumentModel> getAllDocument() {
        return DocumentRepository.findAll();
    }

    public boolean shareDocument(JsonNode jsonNode) {
        ArrayNode usernamesNode = (ArrayNode) jsonNode.get("usernames");

        // Iterate over the array and add each username to the list
        String documentId = jsonNode.get("documentId").asText();
        List<String> userIds = new ArrayList<>();
        // Iterate over the array and add each username to the list
        for (JsonNode usernameNode : usernamesNode) {
            User user = userService.getUserByName(usernameNode.asText());
            System.err.println(user.toString());
            if (user == null) {
                return false;
            }
            userIds.add(user.getId());
        }
        if (jsonNode.get("viewOnly") == null || jsonNode.get("edit") == null) {
            return false;
        }
        boolean viewOnly = jsonNode.get("viewOnly").asBoolean();
        boolean edit = jsonNode.get("edit").asBoolean();
        DocumentModel document = DocumentRepository.findById(documentId).orElse(null);
        if (document == null) {
            return false;
        }
        // ----all parameters are extacted and valid now we can share the document
        // get from userPermission table a row that have userId and documentId give from
        // the request
        // if the row is not exist create a new row with the userId and documentId and
        // the permissions
        // if the row is exist update the permissions
        for (String userId : userIds) {
            UserPermissions userPermissions = userPermissionService.getUserPermissionByDocumentIdAndUserId(documentId,
                    userId);
            if (userPermissions == null) {
                userPermissions = new UserPermissions(userId, documentId, false, viewOnly, edit);
            } else {
                userPermissions.setEdit(edit);
                userPermissions.setViewOnly(viewOnly);
            }
            userPermissionService.saveUserPermissions(userPermissions);
        }

        return true;

    }

    public DocumentModel saveDocument(DocumentModel document) {
        return DocumentRepository.save(document);
    }
}
