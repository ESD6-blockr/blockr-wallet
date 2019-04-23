import * as React from 'react';

import { Button, Checkbox, Form } from 'semantic-ui-react';

require('./Login.scss');

const Login: React.SFC = () => (
    <div>
        <Form>
            <Form.Field required>
                <label>Public key</label>
                <input placeholder="Public key" />
            </Form.Field>
            <Form.Field required>
                <label>Private key</label>
                <input placeholder="Private key" />
            </Form.Field>
            <Form.Field required>
                <Checkbox label="I agree to the Terms and Conditions" />
            </Form.Field>
            <Button type="submit">Login</Button>
        </Form>
        <div>xd</div>
    </div>
);

export default Login;
