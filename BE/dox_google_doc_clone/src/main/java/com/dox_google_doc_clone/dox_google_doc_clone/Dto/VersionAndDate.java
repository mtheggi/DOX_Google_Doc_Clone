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
public class VersionAndDate {
    private String Version;
    private LocalDateTime createdAt;
    private int index;
}
