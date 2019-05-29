import { logger } from "@blockr/blockr-logger";
import * as React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { IRootState } from "reducers";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { login } from "../../actions/authentication.actions";
import { goToUrl } from "../../store/routerHistory";
import "./login.scss";

interface DefaultState {
    privateKey: string;
    publicKey: string;
    agreement: number;
}

const mapStateToProps = (state: IRootState) => ({
    currentUser: state.authentication.currentUser,
    isLoading: state.authentication.isLoading,
});

const mapDispatchToProps = {
    login,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class Login extends React.Component<Props, DefaultState> {
    constructor(props: any) {
        super(props);

        this.state = {
            agreement: 0,
            privateKey: "",
            publicKey: "",
        };
    }

    public componentDidMount() {
        if (this.props.currentUser) {
            goToUrl("/profile");
        }
    }

    public handlePublicKeyChange = (element) => {
        this.setState({
            publicKey: element.target.value,
        });
    };

    public handlePrivateKeyChange = (element) => {
        this.setState({
            privateKey: element.target.value,
        });
    };

    public handleAgreementChange = (element, data) => {
        this.setState({
            agreement: data.checked ? 1 : 0,
        });
    };

    public handleLogin = () => {
        if (this.state.agreement) {
            this.props.login(this.state.publicKey, this.state.privateKey);
            return;
        }
        toast.info("Please agree to the Terms and Conditions");
    };

    public render() {
        const { isLoading } = this.props;
        return (
            <div>
                <Form onSubmit={this.handleLogin}>
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
                        <Checkbox
                            label="I agree to the Terms and Conditions"
                            value={this.state.agreement}
                            onChange={this.handleAgreementChange}
                        />
                    </Form.Field>
                    <Button type="submit" name="loginButton" loading={isLoading}>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
