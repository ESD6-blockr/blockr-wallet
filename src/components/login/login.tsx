import electron from "electron";
import * as fs from "fs";
const { remote } = electron;
const dialog = remote.dialog;
import ospath from "ospath";

import { CryptoKeyUtil } from "@blockr/blockr-crypto";
import { logger } from "@blockr/blockr-logger";
import * as React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { IRootState } from "reducers";
import { Button, Checkbox, Form, Icon, Input, Modal, Segment } from "semantic-ui-react";
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
            toast.error("Please supply correct credentials!");
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

        this.setState({ openGenerateDialog: true, privateKey: privKey, publicKey: String(pubKey) });
    };

    public showSaveDialog = () => {
        logger.info("Saving credentials to local file..");

        const options = {
            // default file location
            defaultPath: ospath.data() + "/.blockr-keyfile.enc",
        };

        dialog.showSaveDialog(null, options, (path) => {
            logger.info("Select path: " + path);
            this.setState({ filePath: path, openEncryptDialog: true });
        });
    };

    public showOpenDialog = () => {
        const options = {
            defaultPath: ospath.data() + "/.blockr-keyfile.enc",
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
                    <Button type="button" onClick={this.generateKeypair}>
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
                            style={{ width: "85%" }}
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
                            type="password"
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
                        <p>
                            Please supply a strong password/passphrase for securely storing your
                            credentials.
                        </p>

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
                    <Modal.Header>
                        <Icon name="exclamation" /> New keypair
                    </Modal.Header>
                    <Modal.Content>
                        <p>
                            Please remember or write down your public key and securely store the
                            private key somewhere. It is recommended to store it in a local file
                            encrypted with a passphrase (via the function on the main screen) AND
                            write it down somewhere for back-up purposes. Losing this key means you
                            lost your funds in the wallet forever!
                        </p>
                        <h3>Public key</h3>
                        <p style={{ display: "inline" }}>{this.state.publicKey}</p>
                        <h3>Private key</h3>
                        <p style={{ display: "inline" }}>{this.state.privateKey}</p>
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
            </div>
        );
    }

    private decryptFile = () => {
        logger.info("Start decrypting local file");
        let decryptedContent;

        try {
            decryptedContent = this.cryptoService.decrypt(
                this.state.encryptedString,
                this.state.passphrase,
            );

            const keys = decryptedContent.split(":");
            if (decryptedContent) {
                toast.success("File was succesfully decrypted!");
                this.setState({ open: false, publicKey: keys[0], privateKey: keys[1] });
                this.userDataStore.set("localFilePath", this.state.filePath);
            }
            logger.info("Done decrypting local file");
        } catch (err) {
            logger.error(err);
            toast.error("Please supply correct passphrase");
        }
    };

    private encryptFile = () => {
        logger.info("Start encrypting local file");

        try {
            fs.writeFile(
                this.state.filePath,
                this.cryptoService.encrypt(
                    this.state.publicKey + ":" + this.state.privateKey,
                    this.state.passphrase,
                ),
                function(this: Login) {
                    this.setState({ openEncryptDialog: false });
                    toast.success("The credentials are saved!");
                    logger.info("The file was saved!");
                }.bind(this),
            );
        } catch (err) {
            toast.error("Something went wrong with encrypting your credentials.");
            logger.error(err);
        }

        logger.info("Done encrypting local file");
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
