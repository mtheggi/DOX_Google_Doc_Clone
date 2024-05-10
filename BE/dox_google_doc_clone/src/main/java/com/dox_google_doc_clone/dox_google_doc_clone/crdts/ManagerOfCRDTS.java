package com.dox_google_doc_clone.dox_google_doc_clone.crdts;

import java.util.HashMap;
import java.util.Map;

public class ManagerOfCRDTS {
    private Map<String, CRDTS> map;
    private static ManagerOfCRDTS instance = null;

    public ManagerOfCRDTS() {
        this.map = new HashMap<>();
    }

    public static ManagerOfCRDTS getInstance() {
        if (instance == null) {
            instance = new ManagerOfCRDTS();
        }
        return instance;
    }

    public void addCRDTS(String key, String content) {
        if (this.map.containsKey(key)) {
            return;
        }
        CRDTS crdts = new CRDTS();
        crdts.ConvertTextIntoSeq(content);
        this.map.put(key, crdts);

    }

    public void insert(String key, CharItem temp) {

        this.map.get(key).insertInCrdts(temp);

    }

    public boolean checkMap(String key) {
        return this.map.containsKey(key);
    }

    public void delete(String key, CharItem temp) {
        this.map.get(key).deleteInCrdts(temp);
    }

    public String SavedInDB(String key) {
        String content = this.map.get(key).convertSeqIntoText();

        return content;
    }
}
