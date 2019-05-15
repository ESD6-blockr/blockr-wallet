import { Transaction } from "@blockr/blockr-models";
import Axios from "axios";

const publicApiUrl = "localhost:3000/api";

export class ApiService {
    public getAllTransactions = () => {
        return [];
    }

    public getTransactionsBySender = (publicKey: string) => {
        return [];
    }

    public getTransactionsByReceiver(publicKey: string): Promise<Transaction[]> {
        return new Promise(async (resolve) => {
            const response = await Axios.get<Transaction[]>(`${publicApiUrl}/transactions`, {
                params: {
                    receiver: publicKey,
                },
            });
            console.log(response);
            resolve([]);
        });
    }
}
