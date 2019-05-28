import * as React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { login as loginAction } from "../../actions/authentication.actions";
import User from "../../models/user";
import { ApiService } from "../../services/apiService";
import { goToUrl } from "../../store/routerHistory";
import "./login.scss";

interface DefaultProps {
    loginAction: (currentUser: User) => void;
}
interface DefaultState {
    privateKey: string;
    publicKey: string;
}

class Login extends React.Component<DefaultProps, DefaultState, object> {
    constructor(props: any) {
        super(props);

        this.state = {
            privateKey: "",
            publicKey: "",
        };
    }

    public handlePublicKeyChange = (element) => {
        this.setState({
            publicKey: element.target.value,
        });
    }

    public handlePrivateKeyChange = (element) => {
        this.setState({
            privateKey: element.target.value,
        });
    }

    public login = () => {
        const user: User = new User(this.state.publicKey, this.state.privateKey);
        this.props.loginAction(user);
        goToUrl("/profile");
    }

    public render() {
        return (
            <div>
                <Form onSubmit={this.login}>
                    <Form.Input
                        label="Public key"
                        required
                        placeholder="Public key"
                        name="passwordInput"
                        value={this.state.publicKey}
                        onChange={this.handlePublicKeyChange}
                    />
                    <Form.Input
                        label="Private key"
                        required
                        placeholder="Private key"
                        type="password"
                        name="passwordInput"
                        value={this.state.privateKey}
                        onChange={this.handlePrivateKeyChange}
                    />
                    <Form.Field required>
                        <Checkbox label="I agree to the Terms and Conditions" />
                    </Form.Field>
                    <Button type="submit" name="loginButton">
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: any, props: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, props: any) => {
    return bindActionCreators({ loginAction }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
