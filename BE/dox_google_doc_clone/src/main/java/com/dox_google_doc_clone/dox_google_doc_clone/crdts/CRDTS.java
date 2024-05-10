package com.dox_google_doc_clone.dox_google_doc_clone.crdts;

import java.util.ArrayList;
import java.util.List;

public class CRDTS {

    public List<CharItem> sequence;

    public CRDTS() {
        this.sequence = new ArrayList<>();
    }

    public void ConvertTextIntoSeq(String content) {

        boolean bold = false;
        boolean italic = false;
        String prevKey = "";
        try {
            prevKey = FractionalIndexing.generateKeyBetween(null, null,
                    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
        } catch (Exception e) {
            // Handle exception
            System.out.println("An error occurred: " + e.getMessage());
        }

        for (int i = 0; i < content.length(); i++) {
            if (i + 8 < content.length() && content.substring(i, i + 8).equals("<strong>")) {
                bold = true;
                i += 7;
                continue;
            }
            if (i + 9 < content.length() && content.substring(i, i + 9).equals("</strong>")) {
                bold = false;
                i += 8;
                continue;
            }
            if (i + 4 < content.length() && content.substring(i, i + 4).equals("<em>")) {
                italic = true;
                i += 3;
                continue;
            }
            if (i + 5 < content.length() && content.substring(i, i + 5).equals("</em>")) {
                italic = false;
                i += 4;
                continue;
            }
            if (i + 3 < content.length() && content.substring(i, i + 3).equals("<p>")) {
                i += 2;
                continue;
            }
            if (i + 4 < content.length() && content.substring(i, i + 4).equals("</p>")) {
                i += 3;
                CharItem item = new CharItem("\n", prevKey, bold, italic);
                this.sequence.add(item);

                try {
                    prevKey = FractionalIndexing.generateKeyBetween(prevKey, null,
                            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
                } catch (Exception e) {
                    // Handle exception
                    System.out.println("An error occurred: " + e.getMessage());
                }
                continue;
            }
            if (i + 4 < content.length() && content.substring(i, i + 4).equals("<br>")) {
                i += 3;
                CharItem item = new CharItem("\n", prevKey, bold, italic);
                this.sequence.add(item);

                try {
                    prevKey = FractionalIndexing.generateKeyBetween(prevKey, null,
                            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
                } catch (Exception e) {
                    // Handle exception
                    System.out.println("An error occurred: " + e.getMessage());
                }
                continue;
            }
            CharItem item = new CharItem(String.valueOf(content.charAt(i)), prevKey, bold, italic);
            this.sequence.add(item);

            try {
                prevKey = FractionalIndexing.generateKeyBetween(prevKey, null,
                        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
            } catch (Exception e) {
                // Handle exception
                System.out.println("An error occurred: " + e.getMessage());
            }
        }
    }

    public synchronized String convertSeqIntoText() {
        StringBuilder content = new StringBuilder();
        boolean bold = false;
        boolean italic = false;

        for (CharItem item : this.sequence) {
            if (item.bold && !bold) {
                content.append("<strong>");
                bold = true;
            } else if (!item.bold && bold) {
                content.append("</strong>");
                bold = false;
            }

            if (item.italic && !italic) {
                content.append("<em>");
                italic = true;
            } else if (!item.italic && italic) {
                content.append("</em>");
                italic = false;
            }

            if (item.value.equals("\n")) {
//                if (bold) {
//                    content.append("</strong>");
//                    bold = false;
//                }
//                if (italic) {
//                    content.append("</em>");
//                    italic = false;
//                }
                content.append("<br>");
            } else {
                content.append(item.value);
            }
        }

        if (bold) {
            content.append("</strong>");
        }
        if (italic) {
            content.append("</em>");
        }

        return content.toString();
    }

    private int getFirstIndex(String fractionIndex) {
        // get first index in the sequence where the fractionalIndex is greater than the
        // index
        int startIndx = 0;
        int endIndx = this.sequence.size() - 1;
        int midIndx;
        while (startIndx <= endIndx) {
            midIndx = (startIndx + endIndx) / 2;
            if (this.sequence.get(midIndx).fractionIndex.compareTo(fractionIndex) <= 0) {
                startIndx = midIndx + 1;
            } else {
                endIndx = midIndx - 1;
            }
        }
        // return negative one if the fractionIndex is greater than all of them
        return startIndx < this.sequence.size() ? startIndx : -1;
    }

    public void insertInCrdts(CharItem item) {
        System.out.println("Insert in CRDTS2 ");
        int indx = getFirstIndex(item.fractionIndex);

        if (indx == -1) {
            this.sequence.add(item);
            return;
        }
        this.sequence.add(indx, item);
    }

    public int getDeleteIndex(String fractionIndex) {
        int startIndx = 0;
        int endIndx = this.sequence.size() - 1;
        int midIndx;
        while (startIndx <= endIndx) {
            midIndx = (startIndx + endIndx) / 2;

            if (this.sequence.get(midIndx).fractionIndex.equals(fractionIndex)) {
                return midIndx;
            }

            if (this.sequence.get(midIndx).fractionIndex.compareTo(fractionIndex) < 0) {
                startIndx = midIndx + 1;
            } else {
                endIndx = midIndx - 1;
            }
        }
        return -1; // the fractionIndex is not in the sequence
    }

    public void deleteInCrdts(CharItem item) {
        int indx = getDeleteIndex(item.fractionIndex);
        System.out.println("Delete in CRDTS2 " + indx);
        if (indx != -1) {
            this.sequence.remove(indx);
        }
    }
}
