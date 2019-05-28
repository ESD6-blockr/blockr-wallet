import { logger } from "@blockr/blockr-logger";
import { Transaction } from "@blockr/blockr-models";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "reducers";
import { Button, Dimmer, Loader, Segment } from "semantic-ui-react";
import { logout } from "../../actions/authentication.actions";
import {
    getAllTransactions,
    getTransactionsByRecipient,
    getTransactionsBySender,
} from "../../actions/transaction.actions";
import { goToUrl } from "../../store/routerHistory";
import "./profile.scss";

const mapStateToProps = (state: IRootState, props: any) => ({
    currentUser: state.authentication.currentUser,
    getTransactionDone: state.transaction.getTransactionDone,
    getTransactionError: state.transaction.getTransactionError,
    getTransactionLoading: state.transaction.getTransactionLoading,
    transactions: state.transaction.transactions,
});

const mapDispatchToProps = {
    getAllTransactions,
    getTransactionsByRecipient,
    getTransactionsBySender,
    logout,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class Profile extends React.Component<Props, {}> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        if (this.props.transactions.length === 0 && this.props.currentUser) {
            this.props.getTransactionsByRecipient(this.props.currentUser.publicKey);
            return;
        }

        logger.error("CurrentUser is null");
    }

    public logout = () => {
        logger.info("Logging out...");
        this.props.logout();
        goToUrl("/");
    }

    public render() {
        const { transactions, currentUser, getTransactionLoading } = this.props;
        return (
            <div className="centered">
                <h2>{currentUser ? currentUser.publicKey : "Unknown"}</h2>
                <h3>Balance: temp 123</h3>
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
                                <div key={index} role="listitem" className="item">
                                    <i
                                        aria-hidden="true"
                                        className="bitcoin large icon middle aligned"
                                    />
                                    <div className="content">
                                        <a className="header">
                                            ${transaction.amount} - {transaction.recipientKey}
                                        </a>
                                        <a className="description">{transaction.date}</a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Segment>
                <div
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                    }}
                >
                    <Button
                        onClick={this.logout}
                        name="logoutButton"
                        className="ui red button space-top right-button"
                    >
                        Logout
                    </Button>
                    <br />
                    <Link className="ui green button space-top right-button" to="/transaction">
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
