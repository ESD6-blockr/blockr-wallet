import { logger } from '@blockr/blockr-logger';
import { toast } from 'react-toastify';
import { ApiService } from '../services/apiService';

const apiService: ApiService = new ApiService();
export const uploadPDFToIPFS = (base64ConvertedPDF: string) => {
    apiService
        .postDocumentToIPFS(base64ConvertedPDF)
        .then(response => {
            toast.info('Uploaded document');
            console.log(response);
        })
        .catch(error => {
            logger.error(error);
            toast.error('Failed to upload document');
        });
};
