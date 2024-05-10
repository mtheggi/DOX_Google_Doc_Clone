package com.dox_google_doc_clone.dox_google_doc_clone.crdts;

import java.util.Arrays;

public class FractionalIndexing {

    public static final String BASE_62_DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    public static String midpoint(String a, String b, String digits) throws Exception {
        char zero = digits.charAt(0);
        if (b != null && a.compareTo(b) >= 0) {
            throw new Exception(a + " >= " + b);
        }
        if ((a.length() > 0 && a.charAt(a.length() - 1) == zero)
                || (b != null && b.length() > 0 && b.charAt(b.length() - 1) == zero)) {
            throw new Exception("trailing zero");
        }
        if (b != null) {
            int n = 0;
            while ((a.charAt(n) == b.charAt(n) || a.charAt(n) == zero) && n < a.length() && n < b.length()) {
                n++;
            }
            if (n > 0) {
                return b.substring(0, n) + midpoint(a.substring(n), b.substring(n), digits);
            }
        }
        int digitA = a.isEmpty() ? 0 : digits.indexOf(a.charAt(0));
        int digitB = (b != null && !b.isEmpty()) ? digits.indexOf(b.charAt(0)) : digits.length();
        if (digitB - digitA > 1) {
            int midDigit = Math.round(0.5f * (digitA + digitB));
            return String.valueOf(digits.charAt(midDigit));
        } else {
            if (b != null && b.length() > 1) {
                return b.substring(0, 1);
            } else {
                return String.valueOf(digits.charAt(digitA)) + midpoint(a.substring(1), null, digits);
            }
        }
    }

    public static void validateInteger(String intStr) throws Exception {
        if (intStr.length() != getIntegerLength(intStr.charAt(0))) {
            throw new Exception("invalid integer part of order key: " + intStr);
        }
    }

    public static int getIntegerLength(char head) throws Exception {
        if (head >= 'a' && head <= 'z') {
            return head - 'a' + 2;
        } else if (head >= 'A' && head <= 'Z') {
            return 'Z' - head + 2;
        } else {
            throw new Exception("invalid order key head: " + head);
        }
    }

    public static String getIntegerPart(String key) throws Exception {
        int integerPartLength = getIntegerLength(key.charAt(0));
        if (integerPartLength > key.length()) {
            throw new Exception("invalid order key: " + key);
        }
        return key.substring(0, integerPartLength);
    }

    public static void validateOrderKey(String key, String digits) throws Exception {
        if (key.equals("A" + String.valueOf(digits.charAt(0)).repeat(26))) {
            throw new Exception("invalid order key: " + key);
        }
        String i = getIntegerPart(key);

        String f = key.substring(i.length());

        if (f.length() > 0 && f.charAt(f.length() - 1) == digits.charAt(0)) {
            throw new Exception("invalid order key: " + key);
        }
    }

    public static String incrementInteger(String x, String digits) throws Exception {
        validateInteger(x);
        char head = x.charAt(0);
        char[] digs = x.substring(1).toCharArray();
        boolean carry = true;
        for (int i = digs.length - 1; carry && i >= 0; i--) {
            int d = digits.indexOf(digs[i]) + 1;
            if (d == digits.length()) {
                digs[i] = digits.charAt(0);
            } else {
                digs[i] = digits.charAt(d);
                carry = false;
            }
        }
        if (carry) {
            if (head == 'Z') {
                return "a" + digits.charAt(0);
            }
            if (head == 'z') {
                return null;
            }
            char h = (char) (head + 1);
            if (h > 'a') {
                return h + String.valueOf(digits.charAt(0)) + new String(digs);
            } else {
                return String.valueOf(head) + new String(Arrays.copyOfRange(digs, 0, digs.length - 1));
            }
        } else {
            return head + new String(digs);
        }
    }

    public static String decrementInteger(String x, String digits) throws Exception {
        validateInteger(x);
        char head = x.charAt(0);
        char[] digs = x.substring(1).toCharArray();
        boolean borrow = true;
        for (int i = digs.length - 1; borrow && i >= 0; i--) {
            int d = digits.indexOf(digs[i]) - 1;
            if (d == -1) {
                digs[i] = digits.charAt(digits.length() - 1);
            } else {
                digs[i] = digits.charAt(d);
                borrow = false;
            }
        }
        if (borrow) {
            if (head == 'a') {
                return "Z" + digits.charAt(digits.length() - 1);
            }
            if (head == 'A') {
                return null;
            }
            char h = (char) (head - 1);
            if (h < 'Z') {
                return h + String.valueOf(digits.charAt(digits.length() - 1)) + new String(digs);
            } else {
                return String.valueOf(head) + new String(Arrays.copyOfRange(digs, 0, digs.length - 1));
            }
        } else {
            return head + new String(digs);
        }
    }

    public static String generateKeyBetween(String a, String b, String digits) throws Exception {
        if (a != null) {
            validateOrderKey(a, digits);
        }
        if (b != null) {
            validateOrderKey(b, digits);
        }
        if (a != null && b != null && a.compareTo(b) >= 0) {
            throw new Exception(a + " >= " + b);
        }
        if (a == null) {
            if (b == null) {
                return "a" + digits.charAt(0);
            }
            String ib = getIntegerPart(b);
            String fb = b.substring(ib.length());
            if (ib.equals("A" + String.valueOf(digits.charAt(0)).repeat(26))) {
                return ib + midpoint("", fb, digits);
            }
            if (ib.compareTo(b) < 0) {
                return ib;
            }
            String res = decrementInteger(ib, digits);
            if (res == null) {
                throw new Exception("cannot decrement any more");
            }
            return res;
        }

        if (b == null) {
            String ia = getIntegerPart(a);
            String fa = a.substring(ia.length());
            String i = incrementInteger(ia, digits);
            return (i == null) ? ia + midpoint(fa, null, digits) : i;
        }

        String ia = getIntegerPart(a);
        String fa = a.substring(ia.length());
        String ib = getIntegerPart(b);
        String fb = b.substring(ib.length());
        if (ia.equals(ib)) {
            return ia + midpoint(fa, fb, digits);
        }
        String i = incrementInteger(ia, digits);
        if (i == null) {
            throw new Exception("cannot increment any more");
        }
        if (i.compareTo(b) < 0) {
            return i;
        }
        return ia + midpoint(fa, null, digits);
    }

    public static String[] generateNKeysBetween(String a, String b, int n, String digits) throws Exception {
        if (n == 0) {
            return new String[0];
        }
        if (n == 1) {
            return new String[] { generateKeyBetween(a, b, digits) };
        }
        if (b == null) {
            String c = generateKeyBetween(a, b, digits);
            String[] result = new String[n];
            result[0] = c;
            for (int i = 1; i < n; i++) {
                c = generateKeyBetween(c, b, digits);
                result[i] = c;
            }
            return result;
        }
        if (a == null) {
            String c = generateKeyBetween(a, b, digits);
            String[] result = new String[n];
            result[0] = c;
            for (int i = 1; i < n; i++) {
                c = generateKeyBetween(a, c, digits);
                result[i] = c;
            }
            for (int i = 0; i < n / 2; i++) {
                String temp = result[i];
                result[i] = result[n - 1 - i];
                result[n - 1 - i] = temp;
            }
            return result;
        }
        int mid = n / 2;
        String c = generateKeyBetween(a, b, digits);
        String[] firstHalf = generateNKeysBetween(a, c, mid, digits);
        String[] secondHalf = generateNKeysBetween(c, b, n - mid - 1, digits);
        String[] result = new String[n];
        System.arraycopy(firstHalf, 0, result, 0, firstHalf.length);
        result[firstHalf.length] = c;
        System.arraycopy(secondHalf, 0, result, firstHalf.length + 1, secondHalf.length);
        return result;
    }

}
