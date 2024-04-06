package com.dox_google_doc_clone.dox_google_doc_clone.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class UserPermissions {

    @Id
    private String id;
    private String userId;
    private String documentId;

    private boolean isOwner;
    private boolean viewOnly;
    private boolean edit;
    public UserPermissions( String userId, String documentId, boolean isOwner, boolean viewOnly, boolean edit) {
        this.userId = userId;
        this.documentId = documentId;
        this.isOwner = isOwner;
        this.viewOnly = viewOnly;
        this.edit = edit;
    }



    @Override
    public String toString() {
        return "UserPermissions{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", documentId='" + documentId + '\'' +
                ", isOwner=" + isOwner +
                ", viewOnly=" + viewOnly +
                ", edit=" + edit +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public boolean isOwner() {
        return isOwner;
    }

    public void setOwner(boolean owner) {
        isOwner = owner;
    }

    public boolean isViewOnly() {
        return viewOnly;
    }

    public void setViewOnly(boolean viewOnly) {
        this.viewOnly = viewOnly;
    }

    public boolean isEdit() {
        return edit;
    }

    public void setEdit(boolean edit) {
        this.edit = edit;
    }
}
