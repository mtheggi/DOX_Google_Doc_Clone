package com.dox_google_doc_clone.dox_google_doc_clone.Models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class UserPermissions {
    private String userId;
    private String documentId;
    private boolean deletePermission;
    private boolean renamePermission;
    private boolean editPermission;

    public UserPermissions(String userId, String documentId, boolean deletePermission, boolean renamePermission,
            boolean editPermission) {
        this.userId = userId;
        this.documentId = documentId;
        this.deletePermission = deletePermission;
        this.renamePermission = renamePermission;
        this.editPermission = editPermission;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public boolean isDeletePermission() {
        return deletePermission;
    }

    public void setDeletePermission(boolean deletePermission) {
        this.deletePermission = deletePermission;
    }

    public boolean isRenamePermission() {
        return renamePermission;
    }

    public void setRenamePermission(boolean renamePermission) {
        this.renamePermission = renamePermission;
    }

    public boolean isEditPermission() {
        return editPermission;
    }

    public void setEditPermission(boolean editPermission) {
        this.editPermission = editPermission;
    }

    @Override
    public String toString() {
        return "UserPermissions [userId=" + userId + ", documentId=" + documentId + ", deletePermission="
                + deletePermission + ", renamePermission=" + renamePermission + ", editPermission=" + editPermission
                + "]";
    }

}
