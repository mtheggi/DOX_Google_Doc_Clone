package com.dox_google_doc_clone.dox_google_doc_clone.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dox_google_doc_clone.dox_google_doc_clone.Repositories.DocumentRepository;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.DocumentModel;

@Service
public class DocumentService {
    private final DocumentRepository DocumentRepository;

    @Autowired
    public DocumentService(DocumentRepository DocumentRepository) {
        this.DocumentRepository = DocumentRepository;
    }

    public List<DocumentModel> getAllDocument() {
        return DocumentRepository.findAll();
    }

    public DocumentModel saveDocument(DocumentModel document) {
        return DocumentRepository.save(document);
    }
}
