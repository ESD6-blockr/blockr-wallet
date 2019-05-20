import { Transaction } from "@blockr/blockr-models";
import Axios from "axios";

const publicApiUrl = "http://127.0.0.1:8000";
const transactionRoute = publicApiUrl + "/transactions";

export class ApiService {
    public getAllTransactionsAsync = (): Promise<Transaction[]> => {
        return new Promise(async (resolve) => {
            const response = await Axios.get<Transaction[]>(transactionRoute);
            resolve(response.data);
        });
    }

    public getTransactionsBySender = (publicKey: string): Promise<Transaction[]> => {
        return this.getTransactionsByQuery({
            publicKey,
        });
    }

    public getTransactionsByReceiver(publicKey: string): Promise<Transaction[]> {
        return this.getTransactionsByQuery({
            publicKey,
        });
    }

    private getTransactionsByQuery(queryObject: object): Promise<Transaction[]> {
        return new Promise(async (resolve) => {
            const response = await Axios.get<Transaction[]>(transactionRoute, queryObject);
            resolve(response.data);
        });
    }
}
