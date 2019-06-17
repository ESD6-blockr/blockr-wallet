import { logger } from "@blockr/blockr-logger";
import { toast } from "react-toastify";
import FeedbackData from "../components/overview/feedback/feedback_mock/feedback.json";
import { ApiService } from "../services/apiService";

const apiService: ApiService = new ApiService();

export const uploadPDFToIPFS = (base64ConvertedPDF: string) => {
    apiService
        .postDocumentToIPFS(base64ConvertedPDF)
        .then((response) => {
            toast.info("Uploaded document");
            logger.info("Uploaded document with hash: " + response);
            FeedbackData.push({ hash: response.toString(), feedback: [] });
            apiService.updateDocumentsMock();
        })
        .catch((error) => {
            logger.error(error);
            toast.error("Failed to upload document");
        });
};
