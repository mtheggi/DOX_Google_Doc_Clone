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

    @CreatedDate
    private LocalDateTime createdAt;
    public DocumentModel(String title, String content) {
        this.title = title;
        this.content = content;

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
