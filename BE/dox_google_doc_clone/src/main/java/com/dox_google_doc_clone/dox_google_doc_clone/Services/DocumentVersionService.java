package com.dox_google_doc_clone.dox_google_doc_clone.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.dox_google_doc_clone.dox_google_doc_clone.Dto.VersionAndDate;
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

    public void addDocumentVersion(String documentId, String content) {

        DocumentVersionTable table = documentVersionRepository.findByDocumentId(documentId);

        VersionAndDate temp = new VersionAndDate(content, LocalDateTime.now());

        List<VersionAndDate> versions;

        if (table == null) {

            versions = List.of(temp);
            table = new DocumentVersionTable(versions, documentId);

            documentVersionRepository.save(table);

            return;
        }

        versions = table.getDocumentVersions();
        versions.add(temp);
        table.setDocumentVersions(versions);
        documentVersionRepository.save(table);
    }

    public void deleteDocumentVersion(String documentId, int index) {
        DocumentVersionTable table = documentVersionRepository.findByDocumentId(documentId);
        List<VersionAndDate> versions = table.getDocumentVersions();
        versions.remove(versions.get(index));
        table.setDocumentVersions(versions);
        documentVersionRepository.save(table);
    }

}
