const Base64 = require('base-64');

export class Base64Service {

    /**
     * Creates a base-64 encoded ASCII string from a "string" of binary data.
     * @param str
     * @returns {string}
     */
    static b64EncodeUnicode(str){
        return Base64.encode(str.trim());
    }

    /**
     * Decodes a string of data which has been encoded using base-64 encoding.
     * @param str
     * @returns {string}
     */
    static b64DecodeUnicode(str) {
        return Base64.decode(str);
    }
}
