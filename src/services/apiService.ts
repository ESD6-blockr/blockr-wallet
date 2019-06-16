import { State, Transaction } from "@blockr/blockr-models";
import Axios from "axios";
import * as fs from "fs";
import { reject } from "q";
import { resolve } from "url";
import { getIPFSIp, getValidatorIp } from "../components/application";
import feedback_data from "../components/overview/feedback/feedback_mock/feedback.json";

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
        return new Promise(async (resolved, rejected) => {
            return Axios.post(this.getTransactionRoute(), transaction)
                .then(() => resolved())
                .catch((error) => rejected(error));
        });
    }

    public postDocumentToIPFS(base64EncodedPDF: string) {
        return new Promise(async (solve, fail) => {
            return Axios.post(this.getIPFSRoute(), {
                base64EncodedPDF,
            })
                .then((response) => solve(response.data.hash))
                .catch((error) => fail(error));
        });
    }

    public getFeedbackForDocumentIPFSHash(hash: string) {
        let feedback: Array<{ value: string; pubKey: string; time: number }> = [];
        feedback_data.forEach((data) => {
            if (data.hash === hash) {
                feedback = data.feedback;
            }
        });
        return feedback;
    }

    public addFeedbackInDocument(hash: string, feedback: string): void {
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        feedback_data.map((data) => {
            if (data.hash === hash) {
                data.feedback.push({ value: feedback, time: timestamp, pubKey: "PUBLICKEYOFUSER" });
            }
        });
        fs.writeFile(
            "./src/components/overview/feedback/feedback_mock/feedback.json",
            JSON.stringify(feedback_data, null, 4),
            (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("File has been created");
            },
        );
    }
    public getAllDocumentsWithFeedback() {
        Axios.get("http://145.93.165.33:3000/ptsmock/ipfshashes")
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        return feedback_data;
    }
    public getBlockchainStateByPublicKey(publicKey: string): Promise<State> {
        return new Promise(async (event, decline) => {
            Axios.get<State>(`${this.getStatesRoute()}/${publicKey}`)
                .then((response) => event(response.data))
                .catch((error) => decline(error));
        });
    }

    private getTransactionsByQuery(queryObject: object): Promise<Transaction[]> {
        return new Promise(async (handle, fault) => {
            Axios.get<Transaction[]>(this.getTransactionRoute(), { params: queryObject })
                .then((response) => handle(response.data))
                .catch((error) => fault(error));
        });
    }

    private getTransactionRoute(): string {
        return `${getValidatorIp()}/transactions`;
    }

    private getIPFSRoute(): string {
        return `${getIPFSIp()}/api/ipfs`;
    }
    private getStatesRoute(): string {
        return `${getValidatorIp()}/states`;
    }
}
