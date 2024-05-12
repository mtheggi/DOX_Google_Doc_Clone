package com.dox_google_doc_clone.dox_google_doc_clone.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.DocumentVersionTable;
import com.dox_google_doc_clone.dox_google_doc_clone.Repositories.DocumentVersionRepository;

@Service
public class DocumentVersionService {
    private final DocumentVersionRepository documentVersionRepository;

    public DocumentVersionService(DocumentVersionRepository documentVersionRepository) {
        this.documentVersionRepository = documentVersionRepository;
    }

    public void saveDocumentVersion(DocumentVersionTable table) {
        documentVersionRepository.save(table);

    }

    public DocumentVersionTable getDocumentVersionByDocumentId(String documentId) {
        return documentVersionRepository.findByDocumentId(documentId);
    }

    public void addDocumentVersion(String documentId, String version) {
        DocumentVersionTable table = documentVersionRepository.findByDocumentId(documentId);
        if (table == null) {
            List<String> versions = List.of(version);
            table = new DocumentVersionTable(LocalDateTime.now(), versions, documentId);

            documentVersionRepository.save(table);
            return;
        }
        List<String> versions = table.getDocumentVersions();
        versions.add(version);
        table.setDocumentVersions(versions);
        documentVersionRepository.save(table);
    }

    public void deleteDocumentVersion(String documentId, String version) {
        DocumentVersionTable table = documentVersionRepository.findByDocumentId(documentId);
        List<String> versions = table.getDocumentVersions();
        versions.remove(version);
        table.setDocumentVersions(versions);
        documentVersionRepository.save(table);
    }

}
