export class ReviewIPFSContract {
    // The IPFS hash of the file that needs to be reviewed
    private ipfsHash: string;
    // The owner address of the contract
    private owner: string;
    // An array of addresses that are allowed to review the file
    private reviewers: string[];
    // Anonymous feedback
    private feedback: string[];
    constructor(hash: string, owner: string, reviewers: string[], feedback: string[]) {
        this.ipfsHash = hash;
        this.owner = owner;
        this.reviewers = reviewers;
        this.feedback = feedback;
    }
    public initConstructor(hash: string, owner: string, reviewers: string[]) {
        this.ipfsHash = hash;
        this.owner = owner;
        this.reviewers = reviewers;
        this.feedback = [];
    }
    public postFeedback(address: string, feedback: string, hash: string) {
        if (this.ipfsHash !== hash) {
            return "This contract covers a different IPFS file";
        }
        if (!this.reviewers.includes(address)) {
            return "You're not authorized to review this file";
        }
        this.feedback.push(feedback);
        return "Posting feedback succeeded";
    }
    public getFeedback(address: string) {
        if (this.owner !== address) {
            return "Only the owner can fetch feedback";
        }
        return this.feedback;
    }
}
