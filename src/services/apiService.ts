import { State, Transaction } from "@blockr/blockr-models";
import Axios from "axios";
import { getValidatorIp } from "../components/application";

export class ApiService {
    public getAllTransactionsAsync = (): Promise<Transaction[]> => {
        return this.getTransactionsByQuery({});
    };

    public getTransactionsBySender = (publicKey: string): Promise<Transaction[]> => {
        return this.getTransactionsByQuery({
            "transactionHeader.senderKey": publicKey,
        });
    };

    public getTransactionsByRecipient(publicKey: string): Promise<Transaction[]> {
        return this.getTransactionsByQuery({
            "transactionHeader.recipientKey": publicKey,
        });
    }

    public postTransaction(transaction: Transaction): Promise<void> {
        return new Promise(async (resolve, reject) => {
            return Axios.post(this.getTransactionRoute(), transaction)
                .then(() => resolve())
                .catch((error) => reject(error));
        });
    }

    public getBlockchainStateByPublicKey(publicKey: string): Promise<State> {
        return new Promise(async (resolve, reject) => {
            Axios.get<State>(this.getStatesRoute() + "/" + publicKey)
                .then((response) => resolve(response.data))
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

    private getStatesRoute(): string {
        return `${getValidatorIp()}/states`;
    }
}
