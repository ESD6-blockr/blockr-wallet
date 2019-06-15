import crypto from "crypto";
import pbkdf2 from "pbkdf2";
const algorithm = "aes-256-cbc";

// https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb
export class CryptoService {
    public encrypt = (text, password) => {
        const derivedKey = pbkdf2.pbkdf2Sync(password, "salt", 1, 32, "sha512");

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(derivedKey), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString("hex") + ":" + encrypted.toString("hex");
    };

    public decrypt = (text, password) => {
        const derivedKey = pbkdf2.pbkdf2Sync(password, "salt", 1, 32, "sha512");

        const textParts = text.split(":");
        const iv = new Buffer(textParts.shift(), "hex");
        const encryptedText = new Buffer(textParts.join(":"), "hex");
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(derivedKey), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    };
}
