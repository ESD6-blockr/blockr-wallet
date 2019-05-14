import { logger } from "@blockr/blockr-logger";
import * as React from "react";
import { Link } from "react-router-dom";
import "./profile.scss";

const profile = {
    balance: 233,
    publicKey: "11231023012312301023012031",
    transactions: [
        {
            amount: 502,
            date: "07-05-2019",
            from: "11231023012312301023012031",
            hash: "12312312341312",
            id: 1,
            to: "1023812038123123123",
        },
        {
            amount: 120,
            date: "02-05-2019",
            from: "11231023012312301023012031",
            hash: "12312541412412",
            id: 2,
            to: "1203102414201024",
        },
    ],
};

export default class Profile extends React.Component<any, any> {
    public render() {
        return (
            <div className="centered">
                <h2>{profile.publicKey}</h2>
                <h3>Balance: {profile.balance}</h3>
                <h3>Transactions</h3>
                <div role="list" className="ui divided relaxed list left-div">
                    {profile.transactions.map((value, index) => {
                        return (
                            <div key={index} role="listitem" className="item">
                                <i
                                    aria-hidden="true"
                                    className="bitcoin large icon middle aligned"
                                />
                                <div className="content">
                                    <a className="header">
                                        {value.amount} - {value.to}
                                    </a>
                                    <a className="description">{value.date}</a>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                    }}
                >
                    <Link className="ui red button space-top right-button" to="/">
                        Logout
                    </Link>
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
