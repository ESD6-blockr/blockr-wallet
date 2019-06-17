import { logger } from "@blockr/blockr-logger";
import { State, Transaction } from "@blockr/blockr-models";
import Axios from "axios";
import * as fs from "fs";
import { getIPFSIp, getValidatorIp } from "../components/application";
import FeedbackData from "../components/overview/feedback/feedback_mock/feedback.json";

// This is the IP that is used to mock communication with the Smart Contract group.
const SmartContractGroupMockIP = "http://145.93.165.33:3000/ptsmock/ipfshashes";

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

    public postDocumentToIPFS(base64EncodedPDF: string) {
        return new Promise(async (resolve, reject) => {
            return Axios.post(this.getIPFSRoute(), {
                base64EncodedPDF,
            })
                .then((response) => resolve(response.data.hash))
                .catch((error) => reject(error));
        });
    }

    public getFeedbackForDocumentIPFSHash(hash: string) {
        let feedback: Array<{ value: string; pubKey: string; time: number }> = [];
        FeedbackData.forEach((data) => {
            if (data.hash === hash) {
                feedback = data.feedback;
            }
        });
        return feedback;
    }

    public addFeedbackInDocument(hash: string, feedback: string, publicKey: string): void {
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        FeedbackData.map((data) => {
            if (data.hash === hash) {
                data.feedback.push({ value: feedback, time: timestamp, pubKey: publicKey });
            }
        });
        this.updateDocumentsMock();
    }

    public getAllDocumentsWithFeedbackFromMock() {
        Axios.get(SmartContractGroupMockIP)
            .then((response) => logger.info(response))
            .catch((error) => logger.error(error));
        return FeedbackData;
    }
    public getBlockchainStateByPublicKey(publicKey: string): Promise<State> {
        return new Promise(async (resolve, reject) => {
            Axios.get<State>(`${this.getStatesRoute()}/${publicKey}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }
    public updateDocumentsMock = () => {
        fs.writeFile(
            "./src/components/overview/feedback/feedback_mock/feedback.json",
            JSON.stringify(FeedbackData, null, 4),
            (err) => {
                if (err) {
                    logger.error(err);
                    return;
                }
            },
        );
    };

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

    private getIPFSRoute(): string {
        return `${getIPFSIp()}/api/ipfs`;
    }
    private getStatesRoute(): string {
        return `${getValidatorIp()}/states`;
    }
}
