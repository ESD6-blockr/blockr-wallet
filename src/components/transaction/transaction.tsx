import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "reducers";
import { Table } from "semantic-ui-react";
import { goToUrl } from "../../store/routerHistory";
import "./Transaction.scss";

interface DefaultState {}

const mapStateToProps = (state: IRootState, props: any) => ({
    currentTransaction: state.transaction.currentTransaction,
    currentUser: state.authentication.currentUser,
    transactions: state.transaction.transactions,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class Transaction extends React.Component<Props, DefaultState> {
    public componentDidMount() {
        if (!this.props.currentUser || !this.props.currentTransaction) {
            goToUrl("/");
            return;
        }
    }

    public render() {
        const { currentTransaction } = this.props;

        if (!currentTransaction) {
            return;
        }
        return (
            <div>
                <Table
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
                        {Object.keys(currentTransaction).map((key: string, index: number) => {
                            const value = currentTransaction[key];
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>{key}</Table.Cell>
                                    <Table.Cell>{value}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
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
