import { Grid, Segment } from 'semantic-ui-react';
import * as React from 'react';
import Profile from './profile/Profile';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './login/Login';

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
                    <Router>
                        <div>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/profile" component={Profile} />
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
