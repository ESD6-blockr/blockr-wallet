import * as React from 'react';
import { Link } from 'react-router-dom';

require('./Profile.scss');

const profile = {
    publicKey: '11231023012312301023012031',
    balance: 233,
    transactions: [
        {
            id: 1,
            hash: '12312312341312',
            from: '11231023012312301023012031',
            to: '1023812038123123123',
            amount: 502,
            date: '07-05-2019'
        },
        {
            id: 2,
            hash: '12312541412412',
            from: '11231023012312301023012031',
            to: '1203102414201024',
            amount: 120,
            date: '02-05-2019'
        }
    ]
};

export default class Profile extends React.Component<any, any> {
    render() {
        return (
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <h2>{profile.publicKey}</h2>
                <h3>Balance: {profile.balance}</h3>
                <h3>Transactions</h3>
                <div
                    role="list"
                    className="ui divided relaxed list"
                    style={{
                        textAlign: 'left'
                    }}
                >
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
                <Link
                    className="ui button"
                    to="/"
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px'
                    }}
                >
                    Logout
                </Link>
            </div>
        );
    }
}
