import * as React from 'react';

import { Grid, Segment } from 'semantic-ui-react';
import LoginContainer from '../../containers/login/LoginContainer';

require('../../Global.scss');

const Application = () => (
    <div>
        <Grid centered={true} columns={2}>
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
                    <LoginContainer />
                </Segment>
            </Grid.Column>
        </Grid>
        {/*Import Semantic UI*/}
        <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
    </div>
);

export default Application;
