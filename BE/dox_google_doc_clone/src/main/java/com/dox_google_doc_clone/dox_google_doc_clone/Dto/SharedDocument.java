package com.dox_google_doc_clone.dox_google_doc_clone.Dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SharedDocument {
    private String id;
    private String title;
    private String content;
    private boolean Edit; // 1 fot edit , 0 for view only
    private LocalDateTime createdAt;
    private String Ownername;
}
