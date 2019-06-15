import { Transaction } from "@blockr/blockr-models";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "reducers";
import { Button, Dimmer, Loader, Segment } from "semantic-ui-react";
import { logout } from "../../actions/authentication.actions";
import { getStateByPublicKey } from "../../actions/state.actions";
import {
    getTransactionsByRecipient,
    setCurrentTransaction,
} from "../../actions/transaction.actions";
import { goToUrl } from "../../store/routerHistory";
import "./profile.scss";

const mapStateToProps = (state: IRootState) => ({
    currentState: state.state.currentState,
    currentUser: state.authentication.currentUser,
    getTransactionDone: state.transaction.getTransactionDone,
    getTransactionError: state.transaction.getTransactionError,
    getTransactionLoading: state.transaction.getTransactionLoading,
    transactions: state.transaction.transactions,
});

const mapDispatchToProps = {
    getStateByPublicKey,
    getTransactionsByRecipient,
    logout,
    setCurrentTransaction,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class Profile extends React.Component<Props> {
    private balanceRefreshTimerId: number;

    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        if (!this.props.currentUser) {
            goToUrl("/");
            return;
        }

        if (this.props.transactions.length === 0) {
            this.props.getTransactionsByRecipient(this.props.currentUser.publicKey);
        }

        if (!this.props.currentState) {
            this.props.getStateByPublicKey(this.props.currentUser.publicKey);
        }

        // @ts-ignore
        this.balanceRefreshTimerId = setInterval(() => {
            if (this.props.currentUser && this.props.currentUser.publicKey) {
                this.props.getStateByPublicKey(this.props.currentUser.publicKey);
            }
        }, 10000);
    }

    public componentWillUnmount() {
        clearInterval(this.balanceRefreshTimerId);
    }

    public handleLogout = () => {
        this.props.logout();
        goToUrl("/");
    };

    public handleTransactionView = (transaction: Transaction) => {
        this.props.setCurrentTransaction(transaction);
        goToUrl("/transaction");
    };

    public render() {
        const { transactions, currentUser, currentState, getTransactionLoading } = this.props;
        return (
            <div className="centered">
                <h2>{currentUser ? currentUser.publicKey : "Unknown"}</h2>
                <h3>Balance: {currentState ? currentState.amount : "Unknown"}</h3>
                <h3>Transactions</h3>
                <Segment>
                    <div role="list" className="ui divided relaxed list left-div">
                        {getTransactionLoading && (
                            <Dimmer active inverted>
                                <Loader />
                            </Dimmer>
                        )}
                        {transactions.map((transaction: Transaction, index: number) => {
                            return (
                                <div
                                    key={index}
                                    role="listitem"
                                    className="item"
                                    onClick={() => this.handleTransactionView(transaction)}
                                >
                                    <i
                                        aria-hidden="true"
                                        className="bitcoin large icon middle aligned"
                                    />
                                    <div className="content">
                                        <a className="header">
                                            ${transaction.transactionHeader.amount} -
                                            {transaction.transactionHeader.recipientKey}
                                        </a>
                                        <a className="description">
                                            {transaction.transactionHeader.date}
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {transactions.length === 0 && <p>No Transactions</p>}
                </Segment>
                <div
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                    }}
                >
                    <Button
                        onClick={this.handleLogout}
                        name="logoutButton"
                        className="ui red button space-top right-button"
                    >
                        Logout
                    </Button>
                    <br />
                    <Link
                        className="ui green button space-top right-button"
                        to="/transaction/create"
                    >
                        Create Transaction
                    </Link>
                    <br />
                    <Link className="ui button space-top right-button" to="/file">
                        Upload file
                    </Link>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Profile);
