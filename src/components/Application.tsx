import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import "../Global.scss";
import Login from "./login/Login";
import Profile from "./profile/Profile";
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
                    <Router>
                        <div>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/transaction" component={Transaction} />
                        </div>
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
