import * as React from 'react';
import { Route, Router, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Segment } from 'semantic-ui-react';
import '../global.scss';
import routerHistory from '../store/routerHistory';
import CreateTransaction from './createTransaction/createTransaction';
import Overview from './overview/overview';
import Login from './login/login';
import Profile from './profile/profile';
import Transaction from './transaction/transaction';
import Feedback from './overview/feedback/feedback';

// let validatorIp: string | undefined;

// const initPeer = async () => {
//     const peer: IPeer = new Peer(PeerType.WALLET);
//     await peer.init();
//     const node = peer.getPeerOfType(PeerType.VALIDATOR);
//     if (node) {
//         validatorIp = node[1];
//     }
// }

// initPeer()

export function getValidatorIp(): string {
    // return validatorIp || "https://public.blockr.verux.nl";
    return 'https://public.blockr.verux.nl';
}

export function getIPFSIp(): string {
    // return validatorIp || "https://public.blockr.verux.nl";
    return 'http://localhost:3002';
}

const numberOfColumns = 2;
const Application = () => (
    <div>
        <Grid centered={true} columns={numberOfColumns}>
            <Grid.Column
                style={{
                    width: '90%'
                }}
            >
                <Segment
                    style={{
                        marginTop: '2%',
                        textAlign: 'center'
                    }}
                >
                    <h1>Blockr Wallet</h1>
                </Segment>
                <Segment>
                    <Router history={routerHistory}>
                        <Switch>
                            <Route path="/profile" component={Profile} />
                            <Route exact path="/transaction/create" component={CreateTransaction} />
                            <Route exact path="/" component={Login} />
                            <Route exact path="/transaction" component={Transaction} />
                            <Route exact path="/feedback" component={Overview} />
                            <Route exact path="/feedback/:hash" component={Feedback} />
                        </Switch>
                    </Router>
                </Segment>
            </Grid.Column>
        </Grid>
        <ToastContainer />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
    </div>
);

export default Application;
