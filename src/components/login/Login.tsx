import * as React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

require('./Login.scss');

export default class Login extends React.Component<any, any> {
    render() {
        return (
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
                    <Link className="ui button" to="/profile">
                        Login
                    </Link>
                </Form>
            </div>
        );
    }
}
