package com.dox_google_doc_clone.dox_google_doc_clone.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.DocumentModel;

public interface DocumentRepository extends MongoRepository<DocumentModel, String> {
    // Custom Qerires
    public void deleteByDocumentId(String documentId);
}
