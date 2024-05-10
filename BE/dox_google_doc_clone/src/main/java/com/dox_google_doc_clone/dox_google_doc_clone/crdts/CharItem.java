package com.dox_google_doc_clone.dox_google_doc_clone.crdts;

public class CharItem {
    public String value;
    public String fractionIndex;
    public boolean bold;
    public boolean italic;

    public CharItem(String value, String fractionIndex, boolean bold, boolean italic) {
        this.value = value;
        this.fractionIndex = fractionIndex;
        this.bold = bold;
        this.italic = italic;
    }

}
