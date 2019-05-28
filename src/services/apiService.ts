import { logger } from "@blockr/blockr-logger";
import { Transaction } from "@blockr/blockr-models";
import Axios from "axios";

const publicApiUrl = "https://public.blockr.verux.nl";
const transactionRoute = publicApiUrl + "/transactions";

export class ApiService {
    public getAllTransactionsAsync = (): Promise<Transaction[]> => {
        logger.info("Within api Service");
        return this.getTransactionsByQuery({});
    }

    public getTransactionsBySender = (publicKey: string): Promise<Transaction[]> => {
        return this.getTransactionsByQuery({
            senderKey: publicKey,
        });
    }

    public getTransactionsByRecipient(publicKey: string): Promise<Transaction[]> {
        return this.getTransactionsByQuery({
            recipientKey: publicKey,
        });
    }

    private getTransactionsByQuery(queryObject: object): Promise<Transaction[]> {
        return new Promise(async (resolve, reject) => {
            Axios.get<Transaction[]>(transactionRoute, { params: queryObject })
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }
}
