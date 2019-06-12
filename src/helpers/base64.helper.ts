import { logger } from "@blockr/blockr-logger";
import { uploadPDFToIPFS } from "../actions/ipfs.actions";
export const getBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        cb(reader.result);
    };
    reader.onerror = (error) => {
        logger.error(error);
    };
};

export const doAPICall = (base64EncodedPDF: string) => {
    uploadPDFToIPFS(base64EncodedPDF);
};
