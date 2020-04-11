const CryptoJS = require("./crypto-js");

function encrypt(word) {
  //密钥--应和后台java解密或是前台js解密的密钥保持一致（16进制）
  var key = CryptoJS.enc.Utf8.parse("1111wwww2222uuuu");
  //偏移量
  var srcs = CryptoJS.enc.Utf8.parse(word);
  //算法
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  //替换--防止值为“1”的情况
  var reg = new RegExp("/", "g");
  var str = encrypted.toString().replace(reg, "#");
  return str;
}

function decrypt(word) {
  var key = CryptoJS.enc.Utf8.parse("1111wwww2222uuuu");
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  var str = CryptoJS.enc.Utf8.stringify(decrypt).toString();
  return str;
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};
