package com.dox_google_doc_clone.dox_google_doc_clone.Repositories;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.UserPermissions;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserPermissionsRepository extends MongoRepository<UserPermissions, String> {
    UserPermissions findByDocumentIdAndUserId(String documentId, String userId);
    List<UserPermissions> findByUserId(String userId);
}
