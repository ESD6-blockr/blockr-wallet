import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import { uploadPDFToIPFS } from "../../actions/ipfs.actions";
import { doAPICall, getBase64 } from "../../helpers/base64.helper";
import "./file.scss";

interface IState {
    file: any;
}

export default class FileUpload extends React.Component<{}, IState> {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }

    public fileChange = (event: any) => {
        this.setState({ file: event.target.files[0] });
    };

    public uploadFile = () => {
        getBase64(this.state.file, doAPICall);
    };

    public render() {
        return (
            <div>
                <div
                    style={{
                        textAlign: "center",
                    }}
                >
                    <h3>Upload File</h3>
                    <Form onSubmit={this.uploadFile}>
                        <Input type="file" accept=".pdf" id="file" onChange={this.fileChange} />
                        <Button type="submit">Submit Paper</Button>
                    </Form>
                    <Link className="ui button" to="/profile">
                        Back
                    </Link>
                </div>
            </div>
        );
    }
}
