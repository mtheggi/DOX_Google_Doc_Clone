package com.dox_google_doc_clone.dox_google_doc_clone.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OperationMsg {
    private String operation;
    private String documentId;
    private String character;
    private String siteId;
    private int counter; // index of the character in the document
    private String fractionIndex; // index of the character in the document
    @Override
    public String toString() {
        return "OperationMsg{" +
                "operation='" + operation + '\'' +
                ", documentId='" + documentId + '\'' +
                ", character='" + character + '\'' +
                ", siteId='" + siteId + '\'' +
                ", counter=" + counter +
                ", fractionIndex=" + fractionIndex +
                '}';
    }

}
