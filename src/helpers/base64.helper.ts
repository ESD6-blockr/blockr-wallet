import { logger } from "@blockr/blockr-logger";
import Axios from "axios";
import { toast } from "react-toastify";
import { uploadPDFToIPFS } from "../actions/ipfs.actions";
import { getIPFSIp } from "../components/application";

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

export const downloadDocument = (file) => {
    Axios.get(getIPFSIp() + "/api/ipfs/" + file.hash, { responseType: "blob" })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", file.hash + ".pdf");
            document.body.appendChild(link);
            link.click();
        })
        .catch((error) => {
            toast.error("Failed to download document.");
            logger.error(error);
        });
};
