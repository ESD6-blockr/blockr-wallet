const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);

// https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb
export class CryptoService {
    public encrypt = (text, key) => {
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    };

    public decrypt = (text, key) => {
        let textParts = text.split(':');
        let iv = new Buffer(textParts.shift(), 'hex');
        let encryptedText = new Buffer(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    };
}
