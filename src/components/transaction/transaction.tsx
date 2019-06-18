import { Transaction as TransactionModel } from "@blockr/blockr-models";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "reducers";
import { Accordion, Button, Form, Icon, Input, Table, Transition } from "semantic-ui-react";
import { ContractMockData } from "../../contract/contract.mock";
import { JsonContractParser } from "../../contract/contract.parser";
import { goToUrl } from "../../store/routerHistory";
import "./Transaction.scss";

const mapStateToProps = (state: IRootState) => ({
    currentTransaction: state.transaction.currentTransaction,
    currentUser: state.authentication.currentUser,
    transactions: state.transaction.transactions,
});

const mapDispatchToProps = {};

interface IState {
    accordionIndex: 0;
    methods: any;
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class Transaction extends React.Component<Props, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            accordionIndex: 0,
            methods: new JsonContractParser().getMockMethods(),
        };
    }

    public handleAccordionClick = (e, title) => {
        let newIndex = title.index;
        if (newIndex === this.state.accordionIndex) {
            newIndex = -1;
        }

        this.setState({
            accordionIndex: newIndex,
        });
    };

    public handleMethodParamChange(methodName, paramName, paramVal) {
        // setting the variables we're gonna use using the state and passed parameters
        const map = this.state.methods;

        // get the method and change the params
        const method: Map<any, any> = map.methods.get(methodName);
        method.set(paramName, paramVal.value);

        // change the state back with the new values
        map.methods.set(methodName, method);
        this.setState({
            methods: map,
        });
    }

    public componentDidMount() {
        if (!this.props.currentUser || !this.props.currentTransaction) {
            goToUrl("/");
            return;
        }
    }

    public render() {
        const mockTrans: TransactionModel = new ContractMockData().mockTransaction;
        const mockMethods = this.constructMethods(new JsonContractParser().getMockMethods());

        const currentTransaction: TransactionModel = mockTrans; // this.props; //<-- this.props was original non-mocked
        const table = this.constructTable(currentTransaction);

        return (
            <div>
                {table}
                {mockMethods}
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

    // constructs the table that houses the transaction information
    public constructTable(currentTransaction) {
        const tableKeys = [] as any;
        let index = 0;
        for (const key of Object.keys(currentTransaction)) {
            tableKeys.push(this.getTableElement(key, currentTransaction, index));
            index++;
        }

        return (
            <table
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
                <Table.Body>{tableKeys}</Table.Body>
            </table>
        );
    }

    public getTableElement(key, currentTransaction, index) {
        const value = (currentTransaction as TransactionModel)[key];
        return (
            <Table.Row key={index}>
                <Table.Cell>{key.toString()}</Table.Cell>
                <Table.Cell>{value.toString()}</Table.Cell>
            </Table.Row>
        );
    }

    // construct the total list of methods
    public constructMethods(methods) {
        const listItems: any = [];

        let index = 0;
        methods.methods.forEach((value: any, key: any) => {
            if (key !== "constructor" && key !== "initConstructor") {
                listItems.push(this.createField(key, value, index));
            }
            index++;
        });

        return (
            <div>
                <Accordion>{listItems}</Accordion>
            </div>
        );
    }

    // creates the parameter elements for each individual method
    public createParams(methodName, paramVal, paramName) {
        return (
            <div key={paramName + "_" + paramVal} style={{ margin: "10px" }}>
                <Input
                    label={paramName}
                    onChange={(evt, value) =>
                        this.handleMethodParamChange(methodName, paramName, value)
                    }
                />
            </div>
        );
    }

    // creates the dropdown element that houses the parameters the method uses
    public createField(methodName, methodParams, index) {
        const params: any = [];
        methodParams.forEach((paramVal: any, paramName: any) => {
            params.push(this.createParams(methodName, paramVal, paramName));
        });

        const activeIndex = this.state.accordionIndex;

        return (
            <div key={methodName}>
                <Form>
                    <Accordion.Title
                        active={activeIndex === index}
                        index={index}
                        onClick={this.handleAccordionClick}
                    >
                        <Icon name="dropdown" />
                        {methodName}
                    </Accordion.Title>
                    <Transition
                        visible={activeIndex === index}
                        animation="slide left"
                        duration={350}
                        transitionOnMount={false}
                    >
                        <Accordion.Content>
                            {params}
                            <Button
                                onClick={() => {
                                    this.submitMethodToExecute(methodName);
                                }}
                            >
                                Submit
                            </Button>
                        </Accordion.Content>
                    </Transition>
                </Form>
            </div>
        );
    }

    public submitMethodToExecute(methodName) {
        // setting the map that holds the methods.
        const map = this.state.methods;
        // get the method to send over.
        const method = map.methods.get(methodName);

        const constructor: Map<any, any> = map.methods.get("constructor");
        const functionParameter: any = {};

        method.forEach((value: string, key: any) => {
            functionParameter[key] = value;
        });

        const objectToSend = new JsonContractParser().parseFunctionContract(
            methodName,
            functionParameter,
            constructor,
            map.classTemplate,
        );

        // TODO: send to Smart Contract Engine to execute. Connection not working.
        //console.log("Method ["+methodName+"] object out :", objectToSend);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Transaction);
