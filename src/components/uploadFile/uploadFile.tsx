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
    setCurrentTransaction,
} from "../../actions/transaction.actions";
import { goToUrl } from "../../store/routerHistory";
import "./profile.scss";

const mapStateToProps = (state: IRootState) => ({
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
    setCurrentTransaction,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
class UploadFile extends React.Component<Props> {
    constructor(props: any) {
        super(props);
    }
}
