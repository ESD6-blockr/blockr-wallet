import * as React from "react";
import { Link } from "react-router-dom";
import { ApiService } from "../../services/apiService";
import { Filelist } from "./feedback/fileList";
const apiService: ApiService = new ApiService();

export default class Overview extends React.Component<any, any> {
    public state = {
        files: apiService.getAllDocumentsWithFeedbackFromMock(),
        selectedHash: "",
    };
    public selectFeedback = (hash) => {
        this.setState({
            selectedHash: hash,
        });
    };

    public render() {
        return (
            <div className="">
                <h1 className="">Feedback - Blockr</h1>
                <div className="fileList">
                    <h2 className="documentHeader ui">Documents</h2>
                    <Filelist files={this.state.files} selectFeedback={this.selectFeedback} />
                </div>
                <Link
                    className="ui column bottom button centered back"
                    to="/profile"
                    style={{ marginTop: 20 }}
                >
                    Back
                </Link>
            </div>
        );
    }
}
