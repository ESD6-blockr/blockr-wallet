import * as React from "react";
import { Route, Router, Switch } from "react-router";
import { Grid, Segment } from "semantic-ui-react";
import "../global.scss";
import routerHistory from "../store/routerHistory";
import Login from "./login/login";
import Profile from "./profile/profile";
import Transaction from "./transaction/Transaction";

const numberOfColumns = 2;
const Application = () => (
    <div>
        <Grid centered={true} columns={numberOfColumns}>
            <Grid.Column
                style={{
                    width: "90%",
                }}
            >
                <Segment
                    style={{
                        marginTop: "2%",
                        textAlign: "center",
                    }}
                >
                    <h1>Blockr Wallet</h1>
                </Segment>
                <Segment>
                    <Router history={routerHistory}>
                        <Switch>
                            <Route path="/profile" component={Profile} />
                            <Route path="/transaction" component={Transaction} />
                            <Route exact path="/" component={Login}/>
                        </Switch>
                    </Router>
                </Segment>
            </Grid.Column>
        </Grid>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
    </div>
);

export default Application;
