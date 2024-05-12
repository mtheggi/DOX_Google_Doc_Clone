package com.dox_google_doc_clone.dox_google_doc_clone.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.DocumentVersionTable;

public interface DocumentVersionRepository extends MongoRepository<DocumentVersionTable, String> {
    DocumentVersionTable findByDocumentId(String documentId);
}
