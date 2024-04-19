package com.dox_google_doc_clone.dox_google_doc_clone.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OperationMsg {
    private String operation;
    private String documentId;
    private String character;


}
