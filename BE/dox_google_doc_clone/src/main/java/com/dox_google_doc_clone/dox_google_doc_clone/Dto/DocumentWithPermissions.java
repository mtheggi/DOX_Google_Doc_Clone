package com.dox_google_doc_clone.dox_google_doc_clone.Dto;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DocumentWithPermissions {

    private String id;

    private String title;

    private String content;

    private String Ownername;

    private LocalDateTime createdAt;
    private boolean isOwner;
    private boolean canEdit;
    private boolean canView;

}
