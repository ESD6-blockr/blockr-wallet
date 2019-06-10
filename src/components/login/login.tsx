import { logger } from '@blockr/blockr-logger';
import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import {
    Button,
    Checkbox,
    Form,
    Icon,
    Segment,
    Input,
    Message,
    Modal,
    Transition,
    Label
} from 'semantic-ui-react';
import { login as loginAction } from '../../actions/authentication.actions';
import User from '../../models/user';
import { ApiService } from '../../services/apiService';
import { goToUrl } from '../../store/routerHistory';
import './login.scss';
import { read } from 'fs';
import { CryptoService } from '../../services/cryptoService';
const fs = require('fs');
import { ObjectHasher, CryptoKeyUtil, IKeyPair } from '@blockr/blockr-crypto';
const { dialog, app } = require('electron').remote;

const UserDataStore = require('../../store/userDataStore');

interface DefaultProps {
    loginAction: (currentUser: User) => void;
}
interface DefaultState {
    privateKey: string;
    publicKey: string;
    passphrase: string;
    filePath: string;
    decryptFileSuccess: boolean;
    open: boolean;
    openEncryptDialog: boolean;
    openGenerateDialog: boolean;
    encryptedString: string;
    invalidKeyPair: boolean;
}

class Login extends React.Component<DefaultProps, DefaultState, object> {
    private apiService: ApiService;
    private cryptoService: CryptoService;
    private fileInputRef: React.RefObject<HTMLInputElement>;
    private objectHasher: ObjectHasher;
    private cryptoKeyUtil: CryptoKeyUtil;
    private userDataStore: UserDataStore;

    constructor(props: any) {
        super(props);

        this.state = {
            privateKey: '',
            publicKey: '',
            passphrase: '',
            filePath: '',
            decryptFileSuccess: false,
            open: false,
            openEncryptDialog: false,
            openGenerateDialog: false,
            encryptedString: '',
            invalidKeyPair: false
        };
        this.apiService = new ApiService();
        this.cryptoService = new CryptoService();
        this.fileInputRef = React.createRef();
        this.objectHasher = new ObjectHasher();
        this.cryptoKeyUtil = new CryptoKeyUtil();
        this.userDataStore = new UserDataStore();
    }

    public handlePublicKeyChange = element => {
        this.setState({
            publicKey: element.target.value
        });
    };

    public handlePrivateKeyChange = element => {
        this.setState({
            privateKey: element.target.value
        });
    };

    public handlePassphraseChange = element => {
        this.setState({
            passphrase: element.target.value
        });
    };

    public handleFilePathChange = element => {
        this.setState({
            filePath: element.target.value
        });
    };

    public login = async () => {
        const user: User = new User(this.state.publicKey, this.state.privateKey);
        let keyPair;

        console.log(this.state.publicKey);
        console.log(this.state.privateKey);

        try {
            keyPair = await this.cryptoKeyUtil.verifyKeyPair(
                this.state.publicKey,
                this.state.privateKey
            );
            console.log('Correct keyPair combination supplied!');
            console.log(keyPair);

            let pubKey = keyPair.getPublic(true, 'hex');
            let privKey = keyPair.getPrivate('hex');

            console.log(pubKey);
            console.log(privKey);

            this.props.loginAction(user);
            goToUrl('/profile');
        } catch (err) {
            console.log(err);
            this.setState({ invalidKeyPair: true });
        }
    };

    public retrieveTransactions = () => {
        logger.info('Start Retrieving');
        this.apiService
            .getTransactionsByReceiver('123')
            .then(transactions => console.log(transactions));
        logger.info('Done Retrieving');
    };

    private decryptFile = () => {
        logger.info('Start decrypting local file');

        console.log(this.state.encryptedString);

        // het semester valt niet meer te r
        let decryptedContent = this.cryptoService.decrypt(
            this.state.encryptedString,
            this.state.passphrase
        ); // key has to be 16 or 32 bytes
        console.log(decryptedContent);
        let keys = decryptedContent.split(':');
        console.log(keys);

        if (decryptedContent) {
            this.toggleSuccessMessage();
            this.setState({ open: false, publicKey: keys[0], privateKey: keys[1] });
            this.userDataStore.set('localFilePath', this.state.filePath);
        }

        logger.info('Done decrypting local file');
    };

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

    private encryptFile = () => {
        logger.info('Start encrypting local file');

        console.log(this.state.filePath);
        console.log(this.state.passphrase);
        console.log(this.state.privateKey);

        fs.writeFile(
            this.state.filePath,
            this.cryptoService.encrypt(
                this.state.publicKey + ':' + this.state.privateKey,
                this.state.passphrase
            ),
            function(this: Login, err) {
                if (err) {
                    return console.log(err);
                }

                this.setState({ openEncryptDialog: false });

                console.log('The file was saved!');
            }.bind(this)
        );

        logger.info('Done encrypting local file');
    };

    fileUpload = event => {
        var file = event.target.files[0];
        var reader = new FileReader();

        this.setState({ filePath: file.path });

        reader.onload = function(this: Login, event: any) {
            // The file's text will be printed here
            console.log(event);
            let encryptedString = event.target.result;
            this.userDataStore.set('localFilePath', file.path);

            this.setState({ open: true, encryptedString });
        }.bind(this);

        reader.readAsText(file);
    };

    fileRead = filePath => {
        console.log('LIJP');
        var contents = fs.readFileSync(filePath, 'utf8');
        console.log(contents);

        console.log('after calling readFile');

        this.setState({ filePath, open: true, encryptedString: contents });
    };

    generateKeypair = () => {
        let keypair = this.cryptoKeyUtil.generateKeyPair();
        let pubKey = keypair.getPublic(true, 'hex');
        let privKey = keypair.getPrivate('hex');

        console.log(pubKey);
        console.log(privKey);

        console.log('generated new keypair');

        this.setState({ openGenerateDialog: true, privateKey: privKey, publicKey: String(pubKey) });
    };

    showSaveDialog = () => {
        const options = {
            defaultPath: app.getPath('documents') + '/blockr-keyfile.enc'
        };

        dialog.showSaveDialog(null, options, path => {
            console.log(path);
            this.setState({ filePath: path, openEncryptDialog: true });
        });
    };

    showOpenDialog = () => {
        const options = {
            defaultPath: app.getPath('documents') + '/blockr-keyfile.enc'
        };

        dialog.showOpenDialog(null, options, path => {
            console.log(path);

            var contents = fs.readFileSync(path[0], 'utf8');
            this.setState({ filePath: path[0], encryptedString: contents, open: true });
        });
    };

    transitionToSaveDialog = () => {
        this.setState({ openGenerateDialog: false });
        this.showSaveDialog();
    };

    closeGenerateDialog = () => {
        this.setState({ openGenerateDialog: false });
        this.setState({ openEncryptDialog: true });
    };

    close = () => this.setState({ open: false });

    public render() {
        const { open, openEncryptDialog, openGenerateDialog } = this.state;

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
                    <Button onClick={this.retrieveTransactions}>Retrieve shit</Button>
                    <Button type="button" onClick={() => this.generateKeypair()}>
                        Register
                    </Button>

                    <Segment
                        style={{
                            marginTop: '2%',
                            height: '20%'
                        }}
                    >
                        <div className="saved-local-path" style={{ width: '100% ' }}>
                            <Input
                                disabled
                                placeholder="/path/to/encryptedFile"
                                value={this.userDataStore.get('localFilePath')}
                                style={{ width: '85% ' }}
                            />
                            <Button
                                onClick={() =>
                                    this.fileRead(this.userDataStore.get('localFilePath'))
                                }
                            >
                                <Icon name="unlock" />
                            </Button>
                        </div>

                        <div style={{ clear: 'both', marginTop: '5px' }} />

                        <div className="local-file-actions">
                            <Button secondary onClick={this.showOpenDialog} floated="right">
                                <Icon name="upload" />
                                Load credentials
                            </Button>

                            <Button primary onClick={this.showSaveDialog} floated="right">
                                <Icon name="download" />
                                Save credentials
                            </Button>
                        </div>
                    </Segment>

                    <Modal size={'tiny'} open={open} onClose={this.close}>
                        <Modal.Header>Unlock local decrypted file</Modal.Header>
                        <Modal.Content>
                            <Input
                                placeholder="passphrase"
                                onChange={this.handlePassphraseChange}
                                value={this.state.passphrase}
                                style={{ width: '100%' }}
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
                        size={'tiny'}
                        open={openEncryptDialog}
                        onClose={() => this.setState({ openEncryptDialog: false })}
                    >
                        <Modal.Header>Encrypt local file</Modal.Header>
                        <Modal.Content>
                            <p>
                                Select or create a local file where the credentials will be stored.
                            </p>

                            <label>Public key</label>
                            <br />
                            <Input
                                placeholder="public key"
                                onChange={this.handlePublicKeyChange}
                                value={this.state.publicKey}
                                style={{ width: '100%' }}
                            />

                            <label>Private key</label>
                            <br />
                            <Input
                                placeholder="private key"
                                onChange={this.handlePrivateKeyChange}
                                value={this.state.privateKey}
                                style={{ width: '100%' }}
                            />

                            <label>Passphrase</label>
                            <br />
                            <Input
                                placeholder="passphrase"
                                onChange={this.handlePassphraseChange}
                                value={this.state.passphrase}
                                style={{ width: '100%' }}
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

                    <Modal size={'small'} open={openGenerateDialog}>
                        <Modal.Header>New keypair</Modal.Header>
                        <Modal.Content>
                            <Icon name="exclamation" />
                            <p>
                                Please remember or write down your public key and securely store the
                                private key somewhere. It is recommended to store it in a local file
                                encrypted with a passphrase (via the function on the main screen)
                                AND write it down somewhere for back-up purposes. Losing this key
                                means you lost your funds in the wallet forever!
                            </p>
                            <br />
                            <Label>
                                <Icon name="keycdn" /> Public key
                            </Label>
                            <p style={{ display: 'inline ' }}>{this.state.publicKey}</p>
                            <Label>
                                <Icon name="key" /> Private key
                            </Label>
                            <p style={{ display: 'inline ' }}>{this.state.privateKey}</p>
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

                    <Transition
                        visible={this.state.invalidKeyPair}
                        animation="scale"
                        duration={500}
                    >
                        <Message
                            negative
                            header="Invalid keyPair"
                            content="Please fill in a correct pub/priv key combination"
                        />
                    </Transition>
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
    mapDispatchToProps
)(Login);
