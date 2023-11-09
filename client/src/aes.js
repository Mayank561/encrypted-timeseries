const aes256 = require("aes256");

const Key = "obvwoqcbv21801f19d0zibcoavwpnq";

export const DoEncrypt = (text) =>{
    const encrypted = aes256.encrypt(Key, text);
    return encrypted;
};
export const DoDecrypt = (cipher, username)=>{
    if(cipher.startsWith("Welcome")){
        return cipher;
    }
    if(cipher.startsWith(username)){
        return cipher;
    }
    const decrypt = aes256.decrypt(Key, cipher);
    return decrypt;
};