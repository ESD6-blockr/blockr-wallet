import {
    Transaction as TransactionModel,
    TransactionHeader,
    TransactionType,
} from "@blockr/blockr-models";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "reducers";
import { Table } from "semantic-ui-react";
import { goToUrl } from "../../store/routerHistory";
import "./Transaction.scss";

const mapStateToProps = (state: IRootState) => ({
    currentTransaction: state.transaction.currentTransaction,
    currentUser: state.authentication.currentUser,
    transactions: state.transaction.transactions,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class Transaction extends React.Component<Props> {
    public componentDidMount() {
        if (!this.props.currentUser || !this.props.currentTransaction) {
            goToUrl("/");
            return;
        }
    }

    public render() {
        // mock data
        // let mockTransHead = new TransactionHeader(
        //     "[MOCK]publicKey",
        //     "[MOCK]currentUser.publicKey",
        //     1,
        //     new Date(),
        //     "[MOCK]uuidv4()",
        //     "[MOCK]contract"
        // )
        // let mockTrans = new Transaction(TransactionType.SMART_CONTRACT,mockTransHead,"signature");

        const { currentTransaction } = this.props;

        return (
            <div>
                {/* Below code commented for mocking purposes. */}
                {/* <Table
                    celled
                    style={{
                        width: "90%",
                    }}
                >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Object.keys(currentTransaction as TransactionModel).map(
                            (key: string, index: number) => {
                                const value = (currentTransaction as TransactionModel)[key];
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>{key}</Table.Cell>
                                        <Table.Cell>{value}</Table.Cell>
                                    </Table.Row>
                                );
                            },
                        )}
                    </Table.Body>
                </Table> */}
                <div
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                    }}
                >
                    <Link className="ui button space-top right-button" to="/profile">
                        Back
                    </Link>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Transaction);
