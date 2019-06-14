import { Transaction, TransactionHeader, TransactionType } from "@blockr/blockr-models";

export class ContractMockData {
    public contract: any =
        "export class ReviewIPFSContract {\r\n    " +
        "// The IPFS hash of the file that needs to be reviewed\r\n    " +
        "private ipfsHash: string\r\n    " +
        "// The owner address of the contract\r\n    " +
        "private owner: string\r\n    " +
        "// An array of addresses that are allowed to review the file\r\n    " +
        "private reviewers: string[]\r\n    " +
        "// Anonymous feedback\r\n    " +
        "private feedback: string[]\r\n    " +
        "constructor(hash: string, owner: string, reviewers: string[], feedback: string[]) " +
        "{\r\n        this.ipfsHash = hash\r\n        this.owner = owner" +
        "\r\n        this.reviewers = reviewers\r\n        this.feedback = feedback\r\n    }" +
        "\r\n    initConstructor(hash: string, owner: string, reviewers: string[]) " +
        "{\r\n        this.ipfsHash = hash\r\n        this.owner = owner" +
        "\r\n        this.reviewers = reviewers\r\n        this.feedback = []\r\n    }" +
        "\r\n    postFeedback(address: string, feedback: string, hash: string) " +
        '{\r\n        if (this.ipfsHash !== hash)\r\n            return "This contract covers a different IPFS file"' +
        "\r\n        if (!this.reviewers.includes(address))" +
        '\r\n            return "You\'re not authorized to review this file"' +
        '\r\n        this.feedback.push(feedback)\r\n        return "Posting feedback succeeded"' +
        "\r\n    }\r\n    getFeedback(address: string) " +
        '{\r\n        if (this.owner !== address)\r\n            return "Only the owner can fetch feedback"' +
        "\r\n        return this.feedback\r\n    }\r\n} ";

    public mockContractMethods: any = {
        classTemplate: {
            contract: this.contract,
        },
        constructor: {
            functionName: "constructor",
            functionParameters: {
                feedback: [],
                hash: "Qme4G4NeTKHq1rXPTkNWsvBMia978qmJZ21o5XJkuqcNGs",
                owner: "Qhjk178j",
                reviewers: ["HjlkaK12"],
            },
        },
        functions: [
            { functionName: "constructor", parameters: ["hash", "owner", "reviewers", "feedback"] },
            { functionName: "initConstructor", parameters: ["hash", "owner", "reviewers"] },
            { functionName: "postFeedback", parameters: ["address", "feedback", "hash"] },
            { functionName: "getFeedback", parameters: ["address"] },
        ],
    };

    public mockTransaction: Transaction = new Transaction(
        TransactionType.SMART_CONTRACT,
        new TransactionHeader(
            "[MOCK]publicKey",
            "[MOCK]currentUser.publicKey",
            1,
            new Date(),
            "[MOCK]uuidv4()",
            this.contract,
        ),
        "signature",
    );
}
