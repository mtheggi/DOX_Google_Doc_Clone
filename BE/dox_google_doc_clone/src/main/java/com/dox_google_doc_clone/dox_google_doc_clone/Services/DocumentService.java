package com.dox_google_doc_clone.dox_google_doc_clone.Services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.User;
import com.dox_google_doc_clone.dox_google_doc_clone.Models.UserPermissions;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dox_google_doc_clone.dox_google_doc_clone.Repositories.DocumentRepository;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.DocumentModel;
import com.dox_google_doc_clone.dox_google_doc_clone.Dto.DocumentAndOwnerName;
import com.dox_google_doc_clone.dox_google_doc_clone.Dto.SharedDocument;
import com.dox_google_doc_clone.dox_google_doc_clone.crdts.ManagerOfCRDTS;

@Service
public class DocumentService {
    private final DocumentRepository DocumentRepository;
    private final UserService userService;
    private final UserPermissionsService userPermissionService;
    private ManagerOfCRDTS managerOfCRDTS = ManagerOfCRDTS.getInstance();

    @Autowired
    public DocumentService(DocumentRepository DocumentRepository, UserService userService,
            UserPermissionsService userPermissionService) {
        this.DocumentRepository = DocumentRepository;
        this.userService = userService;
        this.userPermissionService = userPermissionService;
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

    public List<DocumentModel> getAllDocuments(String userId, int page_num) {
        int pageSize = 9;
        List<UserPermissions> userPermissions = userPermissionService.getUserPermissionsByUserId(userId);
        List<DocumentModel> allDocuments = new ArrayList<>();
        for (UserPermissions userPermission : userPermissions) {
            DocumentModel document = DocumentRepository.findById(userPermission.getDocumentId()).orElse(null);
            if (document != null) {
                allDocuments.add(document);
            }
        }
        // Sort the documents by createdAt in descending order
        allDocuments.sort(Comparator.comparing(DocumentModel::getCreatedAt).reversed());
        // [0 .. 5 .. 9 ]
        int start = (page_num - 1) * pageSize;
        int end;
        if (start >= allDocuments.size()) {
            return new ArrayList<>();
        } else {
            end = start + pageSize - 1;
            if (end >= allDocuments.size()) {
                end = allDocuments.size() - 1;
            }

        }
        return allDocuments.subList(start, end + 1);

    }

    public DocumentModel getDocumentModel(String docID) {
        DocumentModel document = DocumentRepository.findById(docID).orElse(null);

        return document;
    }

    public void saveDocument(String docID, String content) {
        DocumentModel document = DocumentRepository.findById(docID).orElse(null);
        if (document == null) {
            return;
        }
        document.setContent(content);
        DocumentRepository.save(document);
    }

    public List<DocumentModel> getOwnedDocuments(String userId, int page_num) {
        int pageSize = 9;
        List<UserPermissions> userPermissions = userPermissionService.getUserPermissionsByUserId(userId);
        List<DocumentModel> ownedDocuments = new ArrayList<>();
        for (UserPermissions userPermission : userPermissions) {
            if (userPermission.isOwner()) {
                DocumentModel document = DocumentRepository.findById(userPermission.getDocumentId()).orElse(null);
                if (document != null) {
                    ownedDocuments.add(document);
                }
            }
        }
        // Sort the documents by createdAt in descending order
        ownedDocuments.sort(Comparator.comparing(DocumentModel::getCreatedAt).reversed());
        // [0 .. 5 .. 9 ]
        int start = (page_num - 1) * pageSize;
        int end;
        if (start >= ownedDocuments.size()) {
            return new ArrayList<>();
        } else {
            end = start + pageSize - 1;
            if (end >= ownedDocuments.size()) {
                end = ownedDocuments.size() - 1;
            }

        }
        return ownedDocuments.subList(start, end + 1);

    }

    public List<SharedDocument> getSharedDocuments(String userId, int page_num) {
        int pageSize = 9;
        List<UserPermissions> userPermissions = userPermissionService.getUserPermissionsByUserId(userId);
        List<SharedDocument> sharedDocuments = new ArrayList<>();

        for (UserPermissions userPermission : userPermissions) {
            if (!(userPermission.isOwner())) {
                DocumentModel document = DocumentRepository.findById(userPermission.getDocumentId()).orElse(null);
                if (document != null) {
                    SharedDocument shared = new SharedDocument(document.getId(), document.getTitle(),
                            document.getContent(), userPermission.isEdit(), document.getCreatedAt(),
                            document.getOwnername());
                    sharedDocuments.add(shared);
                }
            }
        }
        sharedDocuments.sort(Comparator.comparing(SharedDocument::getCreatedAt).reversed());
        // [0 .. 5 .. 9 ]
        int start = (page_num - 1) * pageSize;
        int end;
        if (start >= sharedDocuments.size()) {
            return new ArrayList<>();
        } else {
            end = start + pageSize - 1;
            if (end >= sharedDocuments.size()) {
                end = sharedDocuments.size() - 1;
            }

        }
        return sharedDocuments.subList(start, end + 1);

    }

    public DocumentModel saveDocument(DocumentModel document) {
        return DocumentRepository.save(document);
    }

    public DocumentModel renameDocument(String documentId, String newName) {
        DocumentModel document = DocumentRepository.findById(documentId).orElse(null);
        if (document == null) {
            return null;
        }
        document.setTitle(newName);
        return DocumentRepository.save(document);

    }
}
