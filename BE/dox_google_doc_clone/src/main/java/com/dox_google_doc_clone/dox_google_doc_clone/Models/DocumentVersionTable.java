package com.dox_google_doc_clone.dox_google_doc_clone.Models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.dox_google_doc_clone.dox_google_doc_clone.Dto.VersionAndDate;

@Document
public class DocumentVersionTable {

    @Id
    private String id;

    private List<VersionAndDate> documentVersions;

    private String documentId;

    public DocumentVersionTable(List<VersionAndDate> documentVersions,
            String documentId) {

        this.documentVersions = documentVersions;
        this.documentId = documentId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<VersionAndDate> getDocumentVersions() {
        return documentVersions;
    }

    public void setDocumentVersions(List<VersionAndDate> documentVersions) {
        this.documentVersions = documentVersions;
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }
}
