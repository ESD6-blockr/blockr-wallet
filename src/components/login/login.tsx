// const { dialog, app } = require("electron").remote;
// const fs = require("fs");
import electron from "electron";
import * as fs from "fs";
const { remote } = electron;
const dialog = remote.dialog;
const app = remote.app;

import { CryptoKeyUtil } from "@blockr/blockr-crypto";
import { logger } from "@blockr/blockr-logger";
import * as React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { IRootState } from "reducers";
import {
    Button,
    Checkbox,
    Form,
    Icon,
    Input,
    Label,
    Message,
    Modal,
    Segment,
    Transition,
} from "semantic-ui-react";
import { login } from "../../actions/authentication.actions";
import { CryptoService } from "../../services/cryptoService";
import { goToUrl } from "../../store/routerHistory";
import { UserDataStore } from "../../store/userDataStore";
import "./login.scss";

interface DefaultState {
    privateKey: string;
    publicKey: string;
    agreement: number;
    passphrase: string;
    filePath: string;
    decryptFileSuccess: boolean;
    open: boolean;
    openEncryptDialog: boolean;
    openGenerateDialog: boolean;
    encryptedString: string;
    invalidKeyPair: boolean;
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
    private cryptoService: CryptoService;
    private cryptoKeyUtil: CryptoKeyUtil;
    private userDataStore: UserDataStore;

    constructor(props: any) {
        super(props);

        this.state = {
            agreement: 0,
            decryptFileSuccess: false,
            encryptedString: "",
            filePath: "",
            invalidKeyPair: false,
            open: false,
            openEncryptDialog: false,
            openGenerateDialog: false,
            passphrase: "",
            privateKey: "",
            publicKey: "",
        };

        this.cryptoService = new CryptoService();
        this.cryptoKeyUtil = new CryptoKeyUtil();
        this.userDataStore = new UserDataStore();
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

    public handlePassphraseChange = (element) => {
        this.setState({
            passphrase: element.target.value,
        });
    };

    public handleFilePathChange = (element) => {
        this.setState({
            filePath: element.target.value,
        });
    };

    public handleAgreementChange = (element, data) => {
        this.setState({
            agreement: data.checked ? 1 : 0,
        });
    };

    public handleLogin = async () => {
        logger.info("Logging in user..");

        try {
            // verify keypair-relation
            const keyPair = await this.cryptoKeyUtil.verifyKeyPair(
                this.state.publicKey,
                this.state.privateKey,
            );

            if (this.state.agreement) {
                this.props.login(this.state.publicKey, this.state.privateKey);
                return;
            }
            toast.info("Please agree to the Terms and Conditions");
            goToUrl("/profile");
        } catch (err) {
            logger.error(err);
            this.toggleErrorMessage();
        }
    };

    public fileRead = (filePath) => {
        logger.info("Reading local file..");
        const contents = fs.readFileSync(filePath, "utf8");
        this.setState({ filePath, open: true, encryptedString: contents });
    };

    public generateKeypair = () => {
        logger.info("Generating new keypair..");
        const keypair = this.cryptoKeyUtil.generateKeyPair();
        const pubKey = keypair.getPublic(true, "hex");
        const privKey = keypair.getPrivate("hex");

        logger.info("PUBKEY: " + pubKey);
        logger.info("PRIVKEY: " + privKey);

        this.setState({ openGenerateDialog: true, privateKey: privKey, publicKey: String(pubKey) });
    };

    public showSaveDialog = () => {
        logger.info("Saving credentials to local file..");

        const options = {
            // default file location
            defaultPath: app.getPath("documents") + "/blockr-keyfile.enc",
        };

        dialog.showSaveDialog(null, options, (path) => {
            logger.info("Select path: " + path);
            this.setState({ filePath: path, openEncryptDialog: true });
        });
    };

    public showOpenDialog = () => {
        const options = {
            defaultPath: app.getPath("documents") + "/blockr-keyfile.enc",
        };

        dialog.showOpenDialog(null, options, (path) => {
            logger.info("Select path: " + path);

            const contents = fs.readFileSync(path[0], "utf8");
            this.setState({ filePath: path[0], encryptedString: contents, open: true });
        });
    };

    public transitionToSaveDialog = () => {
        this.setState({ openGenerateDialog: false });
        this.showSaveDialog();
    };

    public close = () => this.setState({ open: false });

    public render() {
        const { isLoading } = this.props;
        const { open, openEncryptDialog, openGenerateDialog } = this.state;

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
                    <Button type="button" onClick={() => this.generateKeypair()}>
                        Register
                    </Button>
                </Form>

                <Segment
                    style={{
                        height: "150px",
                        marginTop: "10px",
                    }}
                >
                    <h3>Actions</h3>
                    <div className="saved-local-path" style={{ width: "100% " }}>
                        <Input
                            disabled
                            placeholder="/path/to/encryptedFile"
                            value={this.userDataStore.get("localFilePath")}
                            style={{ width: "85% " }}
                        />
                        <Button
                            onClick={() => this.fileRead(this.userDataStore.get("localFilePath"))}
                        >
                            <Icon name="unlock" />
                        </Button>
                    </div>

                    <div style={{ clear: "both", marginTop: "5px" }} />

                    <div className="local-file-actions" style={{ float: "right", marginTop: "1%" }}>
                        <Button secondary onClick={this.showOpenDialog}>
                            <Icon name="upload" />
                            Load credentials
                        </Button>

                        <Button primary onClick={this.showSaveDialog}>
                            <Icon name="download" />
                            Save credentials
                        </Button>
                    </div>
                </Segment>

                <Modal size={"tiny"} open={open} onClose={this.close}>
                    <Modal.Header>Unlock local decrypted file</Modal.Header>
                    <Modal.Content>
                        <Input
                            placeholder="passphrase"
                            onChange={this.handlePassphraseChange}
                            value={this.state.passphrase}
                            style={{ width: "100%" }}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            positive
                            icon="checkmark"
                            labelPosition="left"
                            content="Unlock"
                            onClick={this.decryptFile}
                        />
                    </Modal.Actions>
                </Modal>

                <Modal
                    size={"tiny"}
                    open={openEncryptDialog}
                    onClose={() => this.setState({ openEncryptDialog: false })}
                >
                    <Modal.Header>Encrypt local file</Modal.Header>
                    <Modal.Content>
                        <p>Select or create a local file where the credentials will be stored.</p>

                        <label>Public key</label>
                        <br />
                        <Input
                            placeholder="public key"
                            onChange={this.handlePublicKeyChange}
                            value={this.state.publicKey}
                            style={{ width: "100%" }}
                        />

                        <label>Private key</label>
                        <br />
                        <Input
                            placeholder="private key"
                            onChange={this.handlePrivateKeyChange}
                            value={this.state.privateKey}
                            style={{ width: "100%" }}
                        />

                        <label>Passphrase</label>
                        <br />
                        <Input
                            placeholder="passphrase"
                            onChange={this.handlePassphraseChange}
                            value={this.state.passphrase}
                            style={{ width: "100%" }}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            positive
                            icon="checkmark"
                            labelPosition="left"
                            content="Encrypt"
                            onClick={this.encryptFile}
                        />
                    </Modal.Actions>
                </Modal>

                <Modal size={"small"} open={openGenerateDialog}>
                    <Modal.Header>New keypair</Modal.Header>
                    <Modal.Content>
                        <Icon name="exclamation" />
                        <p>
                            Please remember or write down your public key and securely store the
                            private key somewhere. It is recommended to store it in a local file
                            encrypted with a passphrase (via the function on the main screen) AND
                            write it down somewhere for back-up purposes. Losing this key means you
                            lost your funds in the wallet forever!
                        </p>
                        <br />
                        <Label>
                            <Icon name="keycdn" /> Public key
                        </Label>
                        <p style={{ display: "inline " }}>{this.state.publicKey}</p>
                        <Label>
                            <Icon name="key" /> Private key
                        </Label>
                        <p style={{ display: "inline " }}>{this.state.privateKey}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            positive
                            icon="checkmark"
                            labelPosition="left"
                            content="OK"
                            onClick={this.transitionToSaveDialog}
                        />
                    </Modal.Actions>
                </Modal>

                <Transition
                    visible={this.state.decryptFileSuccess}
                    animation="scale"
                    duration={500}
                >
                    <Message
                        success
                        header="File was succesfully decrypted"
                        content="You may now proceed with further actions in the application"
                    />
                </Transition>

                <Transition visible={this.state.invalidKeyPair} animation="scale" duration={500}>
                    <Message
                        negative
                        header="Invalid Credentials"
                        content="Please supply correct credentials!"
                    />
                </Transition>
            </div>
        );
    }

    private toggleSuccessMessage = () => {
        this.setState({ decryptFileSuccess: true });
        setTimeout(() => {
            this.setState({ decryptFileSuccess: false });
        }, 2000);
    };

    private toggleErrorMessage = () => {
        this.setState({ invalidKeyPair: true });
        setTimeout(() => {
            this.setState({ invalidKeyPair: false });
        }, 2000);
    };

    private decryptFile = () => {
        logger.info("Start decrypting local file");

        // het semester valt niet meer te r
        const decryptedContent = this.cryptoService.decrypt(
            this.state.encryptedString,
            this.state.passphrase,
        ); // key has to be 16 or 32 bytes

        const keys = decryptedContent.split(":");

        if (decryptedContent) {
            this.toggleSuccessMessage();
            this.setState({ open: false, publicKey: keys[0], privateKey: keys[1] });
            this.userDataStore.set("localFilePath", this.state.filePath);
        }

        logger.info("Done decrypting local file");
    };

    private encryptFile = () => {
        logger.info("Start encrypting local file");

        fs.writeFile(
            this.state.filePath,
            this.cryptoService.encrypt(
                this.state.publicKey + ":" + this.state.privateKey,
                this.state.passphrase,
            ),
            function(this: Login, err) {
                if (err) {
                    logger.error(err);
                }

                this.setState({ openEncryptDialog: false });

                logger.info("The file was saved!");
            }.bind(this),
        );

        logger.info("Done encrypting local file");
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
