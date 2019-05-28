import { logger } from "@blockr/blockr-logger";
import { Transaction } from "@blockr/blockr-models";
import Axios from "axios";
import { getValidatorIp } from "../components/application";

export class ApiService {
    public getAllTransactionsAsync = (): Promise<Transaction[]> => {
        logger.info("Within api Service");
        return this.getTransactionsByQuery({});
    };

    public getTransactionsBySender = (publicKey: string): Promise<Transaction[]> => {
        return this.getTransactionsByQuery({
            senderKey: publicKey,
        });
    };

    public getTransactionsByRecipient(publicKey: string): Promise<Transaction[]> {
        return this.getTransactionsByQuery({
            recipientKey: publicKey,
        });
    }

    public postTransaction(transaction: Transaction): Promise<void> {
        return new Promise(async (resolve, reject) => {
            return Axios.post(this.getTransactionRoute(), transaction)
                .then(() => resolve())
                .catch((error) => reject(error));
        });
    }

    private getTransactionsByQuery(queryObject: object): Promise<Transaction[]> {
        return new Promise(async (resolve, reject) => {
            Axios.get<Transaction[]>(this.getTransactionRoute(), { params: queryObject })
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }

    private getTransactionRoute(): string {
        return `${getValidatorIp()}/transactions`;
    }
}
