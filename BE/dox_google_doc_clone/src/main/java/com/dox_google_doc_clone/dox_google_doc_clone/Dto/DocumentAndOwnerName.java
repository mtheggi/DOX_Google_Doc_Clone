package com.dox_google_doc_clone.dox_google_doc_clone.Dto;

import com.dox_google_doc_clone.dox_google_doc_clone.Models.DocumentModel;

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
public class DocumentAndOwnerName {
    private DocumentModel doc;
    private String ownerName;

}
