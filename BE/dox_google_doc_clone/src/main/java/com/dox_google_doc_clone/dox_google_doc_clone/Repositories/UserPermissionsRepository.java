package com.dox_google_doc_clone.dox_google_doc_clone.Repositories;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.UserPermissions;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserPermissionsRepository extends MongoRepository<UserPermissions, String> {
    UserPermissions findByDocumentIdAndUserId(String documentId, String userId);

}
