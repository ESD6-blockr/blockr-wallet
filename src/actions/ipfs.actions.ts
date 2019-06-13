import { logger } from "@blockr/blockr-logger";
import { toast } from "react-toastify";
import { ApiService } from "../services/apiService";
import feedback from "../components/overview/feedback/feedback_mock/feedback.json"
var fs = require("fs");

const apiService: ApiService = new ApiService();
export const uploadPDFToIPFS = (base64ConvertedPDF: string) => {
    apiService
        .postDocumentToIPFS(base64ConvertedPDF)
        .then((response) => {
            toast.info("Uploaded document");
            console.log(response);
            feedback.push({hash:response.toString(), feedback:[]})
            console.log(JSON.stringify(feedback));
            fs.writeFile("./src/components/overview/feedback/feedback_mock/feedback.json", JSON.stringify(feedback, null, 4), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("File has been created");
            });
        })
        .catch((error) => {
            logger.error(error);
            toast.error("Failed to upload document");
        });
};
