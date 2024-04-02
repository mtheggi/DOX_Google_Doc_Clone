package com.dox_google_doc_clone.dox_google_doc_clone.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.UserPermissions;
import com.dox_google_doc_clone.dox_google_doc_clone.Repositories.UserPermissionsRepository;

@Service
public class UserPermissionsService {
    private final UserPermissionsRepository userPermissionsRepository;

    @Autowired
    public UserPermissionsService(UserPermissionsRepository userPermissionsRepository) {
        this.userPermissionsRepository = userPermissionsRepository;
    }

    public UserPermissions saveUserPermissions(UserPermissions userPermissions) {
        return userPermissionsRepository.save(userPermissions);
    }

    public List<UserPermissions> getAllUserPermissions() {
        return userPermissionsRepository.findAll();
    }
}