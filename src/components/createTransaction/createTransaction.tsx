import { Transaction, TransactionHeader, TransactionType } from "@blockr/blockr-models";
import fs from "fs";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Button,
    Container,
    Dropdown,
    Form,
    Header,
    Input,
    Label,
    List,
    Tab,
} from "semantic-ui-react";
import * as uuidv4 from "uuid/v4";
import { getTransactionsByRecipient, postTransaction } from "../../actions/transaction.actions";
import { TRANSACTION_TYPE_OPTIONS } from "../../constants/createTransaction.constant";
import { JsonContractParser } from "../../contract/contract.parser";
import { ReviewIPFSContract } from "../../contract/contract.review";
import ContractType from "../../contract/contract.type.enum";
import { IRootState } from "../../reducers";
import { goToUrl } from "../../store/routerHistory";
import "./CreateTransaction.scss";

interface DefaultState {
    amount: number;
    bytecode: string; // for custom smart contracts
    ipfsHash: string; // for template smart contracts
    newReviewer: string; // for template smart contracts
    owner: string; // for template smart contracts
    pageInfo: string; // for information handling towards users in the template tab,
    publicKey: string;
    reviewers: string[]; // for template smart contracts
    type: string;
}

const mapStateToProps = (state: IRootState) => ({
    currentUser: state.authentication.currentUser,
    postTransactionLoading: state.transaction.postTransactionLoading,
});

const mapDispatchToProps = {
    getTransactionsByRecipient,
    postTransaction,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class CreateTransaction extends React.Component<Props, DefaultState> {
    public contractParser: JsonContractParser;

    constructor(props: any) {
        super(props);

        this.state = {
            amount: 0,
            bytecode: "", // for custom smart contracts
            ipfsHash: "", // for template smart contracts
            newReviewer: "", // for template smart contracts
            owner: "", // for template smart contracts
            pageInfo: "", // for information handling towards users in the template tab,
            publicKey: "",
            reviewers: [], // for template smart contracts
            type: "coin",
        };

        this.contractParser = new JsonContractParser();
    }

    public componentDidMount() {
        if (!this.props.currentUser) {
            goToUrl("/");
            return;
        }
        this.setState({
            owner: this.props.currentUser.publicKey,
        });
    }

    public handlePublicKeyChange = (element) => {
        this.setState({
            publicKey: element.target.value,
        });
    };

    public handleAmountChange = (element) => {
        this.setState({
            amount: element.target.value,
        });
    };

    public handleTypeChange = (element, data) => {
        this.setState({
            type: data.value,
        });
    };

    public handlePostTransaction = (contractType) => {
        if (!this.props.currentUser) {
            return;
        }
        let transactionHeader: TransactionHeader;
        switch (contractType) {
            case ContractType.None:
                transactionHeader = new TransactionHeader(
                    this.state.publicKey,
                    this.props.currentUser.publicKey,
                    this.state.amount,
                    new Date(),
                );
                break;

            case ContractType.Template:
                transactionHeader = new TransactionHeader(
                    this.state.publicKey,
                    this.props.currentUser.publicKey,
                    this.state.amount,
                    new Date(),
                    uuidv4(),
                    this.handleTemplateContract(),
                );
                break;

            case ContractType.Custom:
                transactionHeader = new TransactionHeader(
                    this.state.publicKey,
                    this.props.currentUser.publicKey,
                    this.state.amount,
                    new Date(),
                    uuidv4(),
                    this.handleCustomContract(),
                );
                break;

            default:
                // show error message or something? creating default no-contract transaction
                transactionHeader = new TransactionHeader(
                    this.state.publicKey,
                    this.props.currentUser.publicKey,
                    this.state.amount,
                    new Date(),
                );
                break;
        }
        const transaction: Transaction = new Transaction(
            TransactionType[this.state.type],
            transactionHeader,
            "signature",
        );
        return;
        this.props.postTransaction(transaction);
    };

    public handleReviewerChange = (e) => {
        this.setState({
            newReviewer: e.target.value,
        });
    };

    public handleIpfsChange = (e) => {
        this.setState({
            ipfsHash: e.target.value,
        });
    };

    public handleByteCodeChange = (e) => {
        this.setState({
            bytecode: e.target.value,
        });
    };

    public render() {
        const contractForm = this.drawTransactionType();

        return (
            <Container>
                <Header as="h1">Transaction Type</Header>
                {contractForm}
                <br />

                <div
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                    }}
                >
                    <Link className="ui button" to="/profile">
                        Profile
                    </Link>
                </div>
            </Container>
        );
    }

    public drawTransactionType() {
        // prepare visual elements to show reviewers
        const reviewers = this.showReviewers();
        // prepare visual element to show infolabel at reviewers
        const infoLabel = this.drawInfoLabel();

        const panes = [
            {
                menuItem: "No contract",
                render: () => (
                    <Tab.Pane>
                        <Form onSubmit={() => this.handlePostTransaction(ContractType.None)}>
                            <Form.Field>
                                <Dropdown
                                    label="Type:"
                                    placeholder="Select type"
                                    fluid
                                    selection
                                    value={this.state.type}
                                    onChange={this.handleTypeChange}
                                    options={TRANSACTION_TYPE_OPTIONS}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    label="To:"
                                    placeholder="Public key"
                                    value={this.state.publicKey}
                                    onChange={this.handlePublicKeyChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    label="Amount:"
                                    placeholder="Amount"
                                    type="number"
                                    value={this.state.amount}
                                    onChange={this.handleAmountChange}
                                />
                            </Form.Field>
                            <Button
                                type="submit"
                                name="createButton"
                                loading={this.props.postTransactionLoading}
                            >
                                Create
                            </Button>
                        </Form>
                    </Tab.Pane>
                ),
            },

            {
                menuItem: "Template contract",
                render: () => (
                    <Tab.Pane>
                        <Form onSubmit={() => this.handlePostTransaction(ContractType.Template)}>
                            <Form.Field>
                                <Dropdown
                                    label="Type:"
                                    placeholder="Select type"
                                    fluid
                                    selection
                                    value={this.state.type}
                                    onChange={this.handleTypeChange}
                                    options={TRANSACTION_TYPE_OPTIONS}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    label="To:"
                                    placeholder="Public key"
                                    value={this.state.publicKey}
                                    onChange={this.handlePublicKeyChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    label="Amount:"
                                    placeholder="Amount"
                                    type="number"
                                    value={this.state.amount}
                                    onChange={this.handleAmountChange}
                                />
                            </Form.Field>
                            <Form.Input>
                                <Input
                                    label="IPFS Hash"
                                    name="ipfs"
                                    value={this.state.ipfsHash}
                                    onChange={this.handleIpfsChange}
                                />
                            </Form.Input>

                            <Header as="h3"> Reviewers </Header>
                            <Form.Group inline>
                                <Form.Input>
                                    <Input
                                        label="Address"
                                        name="reviewAddress"
                                        value={this.state.newReviewer}
                                        onChange={this.handleReviewerChange}
                                    />
                                </Form.Input>
                                <Form.Field>
                                    <Button onClick={this.addReviewer}>Add</Button>
                                </Form.Field>
                                {infoLabel}
                            </Form.Group>
                            {reviewers}
                            <Button
                                type="submit"
                                name="createButton"
                                loading={this.props.postTransactionLoading}
                            >
                                Create
                            </Button>
                        </Form>
                    </Tab.Pane>
                ),
            },

            {
                menuItem: "Custom contract",
                render: () => (
                    <Tab.Pane>
                        <Form onSubmit={() => this.handlePostTransaction(ContractType.Custom)}>
                            <Form.Field>
                                <Dropdown
                                    label="Type:"
                                    placeholder="Select type"
                                    fluid
                                    selection
                                    value={this.state.type}
                                    onChange={this.handleTypeChange}
                                    options={TRANSACTION_TYPE_OPTIONS}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    label="To:"
                                    placeholder="Public key"
                                    value={this.state.publicKey}
                                    onChange={this.handlePublicKeyChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    label="Amount:"
                                    placeholder="Amount"
                                    type="number"
                                    value={this.state.amount}
                                    onChange={this.handleAmountChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    label="Smart Contract"
                                    name="customSmartContract"
                                    value={this.state.bytecode}
                                    onChange={this.handleByteCodeChange}
                                />
                            </Form.Field>
                            <br />
                            <Button
                                type="submit"
                                name="createButton"
                                disabled
                                loading={this.props.postTransactionLoading}
                            >
                                Create
                            </Button>
                        </Form>
                    </Tab.Pane>
                ),
            },
        ];

        return <Tab panes={panes} />;
    }

    public showReviewers() {
        const entries = this.state.reviewers;
        const listItems = entries.map((item) => {
            return this.createField(item);
        });

        return <List>{listItems}</List>;
    }

    public createField = (item) => {
        return (
            <List.Item key={item}>
                <Label> {item} </Label>
                <Button
                    onClick={() => {
                        this.handleDelete(item);
                    }}
                >
                    {" "}
                    Delete{" "}
                </Button>
            </List.Item>
        );
    };

    public drawInfoLabel() {
        let label;

        if (this.state.pageInfo !== "") {
            label = (
                <Form.Field inline>
                    <Label pointing="left">{this.state.pageInfo}</Label>
                </Form.Field>
            );
        }
        return label;
    }

    public addReviewer = (e) => {
        const newReviewers = this.state.reviewers;

        // if newReviewers already contains the newReviewer, or the newReviewer is empty, clear field and return.
        if (newReviewers.includes(this.state.newReviewer) || this.state.newReviewer === "") {
            this.setState({
                newReviewer: "",
                pageInfo: "Please provide a valid new Reviewer.",
            });
            return;
        }
        // if the newreviewer is the person entered as owner, clear field and return.
        if (this.state.newReviewer === this.state.owner) {
            this.setState({
                newReviewer: "",
                pageInfo: "You cannot be your own Reviewer.",
            });
            return;
        }

        newReviewers.push(this.state.newReviewer);
        this.setState({
            newReviewer: "",
            pageInfo: "Reviewer succesfully added!",
            reviewers: newReviewers,
        });
    };

    public handleDelete = (value) => {
        const newReviewers = this.state.reviewers;

        for (let i = 0; i < newReviewers.length; i++) {
            if (newReviewers[i] === value) {
                newReviewers.splice(i, 1);
                i--;
            }
        }

        this.setState({
            pageInfo: "Reviewer succesfully deleted!",
            reviewers: newReviewers,
        });
    };

    public handleTemplateContract = () => {
        const contractTemplate = {
            contract: fs.readFileSync("src/contract/contract.review.ts", "utf8").toString(),
        };

        const functionParams: any = {
            hash: this.state.ipfsHash,
            owner: this.state.owner,
            reviewers: this.state.reviewers,
        };

        const constructorParams: any = {
            feedback: [],
            hash: this.state.ipfsHash,
            owner: this.state.owner,
            reviewers: this.state.reviewers,
        };

        const contract = this.contractParser.parseConstructorContract(
            "initConstructor",
            functionParams,
            constructorParams,
            contractTemplate,
        );
        console.log("contract :: ", contract);
        // log the complete package to be sent over
        return contract;
    };

    public handleCustomContract() {
        // TODO: handle inserted custom bytecode contract
        return "";
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateTransaction);
