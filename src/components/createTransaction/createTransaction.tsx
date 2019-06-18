import { CryptoKeyUtil, ObjectHasher } from "@blockr/blockr-crypto";
import { Transaction, TransactionHeader, TransactionType } from "@blockr/blockr-models";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Dropdown, Form } from "semantic-ui-react";
import { getTransactionsByRecipient, postTransaction } from "../../actions/transaction.actions";
import { TRANSACTION_TYPE_OPTIONS } from "../../constants/createTransaction.constant";
import { IRootState } from "../../reducers";
import { goToUrl } from "../../store/routerHistory";
import "./CreateTransaction.scss";

interface DefaultState {
    amount: number;
    publicKey: string;
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
    constructor(props: any) {
        super(props);

        this.state = {
            amount: 0,
            publicKey: "",
            type: "COIN",
        };
    }

    public componentDidMount() {
        if (!this.props.currentUser) {
            goToUrl("/");
        }
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

    public handlePostTransaction = async () => {
        if (!this.props.currentUser) {
            return;
        }

        const transatcionHeader: TransactionHeader = new TransactionHeader(
            this.state.publicKey,
            this.props.currentUser.publicKey,
            this.state.amount,
            new Date(),
        );

        const cryptoKeyUtils = new CryptoKeyUtil();
        const objectHasher = new ObjectHasher();
        const hash = await objectHasher.hashAsync(transatcionHeader);
        const keyPair = await cryptoKeyUtils.verifyKeyPair(
            this.props.currentUser.publicKey,
            this.props.currentUser.privateKey,
        );
        const signature = cryptoKeyUtils.createSignatureWithKeyPair(hash, keyPair);

        const transaction: Transaction = new Transaction(
            TransactionType[this.state.type],
            transatcionHeader,
            signature,
        );

        this.props.postTransaction(transaction);
    };

    public render() {
        return (
            <div>
                <div
                    style={{
                        textAlign: "center",
                    }}
                >
                    <h3>Create transaction</h3>
                    <Form onSubmit={this.handlePostTransaction}>
                        <Form.Field>
                            <label>Type:</label>
                            <Dropdown
                                placeholder="Select type"
                                fluid
                                selection
                                value={this.state.type}
                                onChange={this.handleTypeChange}
                                options={TRANSACTION_TYPE_OPTIONS}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>To:</label>
                            <input
                                placeholder="Public key"
                                value={this.state.publicKey}
                                onChange={this.handlePublicKeyChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Amount:</label>
                            <input
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
                </div>
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
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateTransaction);
