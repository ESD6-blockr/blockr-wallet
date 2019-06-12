import { Transaction, TransactionHeader, TransactionType } from "@blockr/blockr-models";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Dropdown, Form } from "semantic-ui-react";
import { getTransactionsByRecipient, postTransaction } from "../../actions/transaction.actions";
import { getTransactionTypeOptions } from "../../helpers/transaction.helper";
import { IRootState } from "../../reducers";
import { goToUrl } from "../../store/routerHistory";
import "./CreateTransaction.scss";

interface DefaultState {
    amount: number;
    publicKey: string;
    type: number;
    options: any[];
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
            options: getTransactionTypeOptions(),
            publicKey: "",
            type: 0,
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

    public handlePostTransaction = () => {
        if (!this.props.currentUser) {
            return;
        }

        const transactionHeader: TransactionHeader = new TransactionHeader(
            this.state.publicKey,
            this.props.currentUser.publicKey,
            this.state.amount,
            new Date(),
        );

        const transaction: Transaction = new Transaction(
            this.state.type,
            transactionHeader,
            "signature",
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
                                options={this.state.options}
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
