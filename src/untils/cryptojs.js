import CryptoJS from 'crypto-js';

export default {
    //密码加密
    encrypt(data, key, iv){
        if (typeof data === "object") {
            try {
                data = JSON.stringify(data);
            } catch (error) {
                console.log("encrypt error:", error);
            }
        }

        const dataHex = CryptoJS.enc.Utf8.parse(data);
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        const ivHex = CryptoJS.enc.Utf8.parse(iv);

        const encrypted = CryptoJS.AES.encrypt(dataHex, keyHex, {
            iv: ivHex,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });

        return encrypted.toString();
    },

    //解密
    decrypto(data, key, iv){
        if(data == null){
            return "";
        }

        const dataHex = CryptoJS.enc.Hex.parse(data);

        const dataStr = CryptoJS.enc.Base64.stringify(dataHex);
        const keyHex = CryptoJS.enc.Utf8.parse(keyStr);
        const ivHex = CryptoJS.enc.Utf8.parse(iv);

        const decrypt = CryptoJS.AES.decrypt(dataStr, keyHex, {
            iv: ivHex,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });

        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
}