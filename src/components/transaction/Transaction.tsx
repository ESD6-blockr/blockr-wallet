import * as React from "react";
import { Link } from "react-router-dom";
import { Form } from "semantic-ui-react";
import "./Transaction.scss";

export default class Transaction extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <div
                    style={{
                        textAlign: "center",
                    }}
                >
                    <h3>Create transaction</h3>
                    <Form>
                        <Form.Field>
                            <label>To:</label>
                            <input placeholder="Public key" />
                        </Form.Field>
                        <Form.Field>
                            <label>Amount:</label>
                            <input placeholder="Amount" type="number" />
                        </Form.Field>
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
