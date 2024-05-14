package com.dox_google_doc_clone.dox_google_doc_clone.crdts;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LiveUsers {
    private Map<String, List<String>> map;
    private static LiveUsers instance = null;

    private LiveUsers() {
        this.map = new HashMap<>();
    }

    public static LiveUsers getInstance() {
        if (instance == null) {
            instance = new LiveUsers();
        }
        return instance;
    }

    public void addValue(String key, String value) {
        if (!this.map.containsKey(key)) {
            this.map.put(key, new ArrayList<>());
        }
        this.map.get(key).add(value);
    }

    public List<String> getValues(String key) {
        return this.map.get(key);
    }

}
