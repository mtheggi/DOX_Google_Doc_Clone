package com.dox_google_doc_clone.dox_google_doc_clone.Controllers;

import java.util.List;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.UserPermissions;
import com.dox_google_doc_clone.dox_google_doc_clone.Services.UserPermissionsService;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
public class UserPermissionsController {
    private UserPermissionsService userPermissionsService;

    public UserPermissionsController(UserPermissionsService userPermissionsService) {
        this.userPermissionsService = userPermissionsService;
    }

    @GetMapping("/userpermissions")
    public List<UserPermissions> getAllPermissions() {
        userPermissionsService.saveUserPermissions(new UserPermissions("1", "2", false, false, false));
        return userPermissionsService.getAllUserPermissions();
    }

    @PostMapping("/create/userpermissions")
    public ResponseEntity<UserPermissions> postMethodName(@RequestBody UserPermissions entity) {
        if (entity.getDocumentId() == null || entity.getUserId() == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        UserPermissions savedUserPermissions = userPermissionsService.saveUserPermissions(entity);
        return new ResponseEntity<>(savedUserPermissions, HttpStatus.OK);
    }

}
