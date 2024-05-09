package com.dox_google_doc_clone.dox_google_doc_clone.Models;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
public class DocumentModel {

    @Id
    private String id;

    private String title;

    private String content;

    private String Ownername; 

    @CreatedDate
    private LocalDateTime createdAt;

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public DocumentModel(String title, String content, LocalDateTime createdAt, String Ownername) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.Ownername = Ownername;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public String getOwnername() {
        return Ownername;
    }

    public void setOwnername(String Ownername) {
        this.Ownername = Ownername;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "Document [id=" + id + ", Title=" + title + ", Content=" + content + "]";
    }

}
