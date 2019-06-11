import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import { getIPFSIp } from "../../application";

export default class Filelist extends React.Component<any, any> {
    public viewFeedback = (e, file) => {
        console.log("feedback: " + file.hash);
        this.props.selectFeedback(file.hash);
    };
    public openDocument = (e, file) => {
        window.open(getIPFSIp() + "/api/ipfs/" + file.hash);
        this.props.selectFeedback(file.hash);
    };
    public render() {
        const { files } = this.props;
        const fileList = files.map((file) => {
            return (
                <div className="ui segment" key={file.hash} style={{ margin: 0 }}>
                    <div className="ui column" onClick={(e) => this.viewFeedback(e, file)}>
                        {file.hash}
                    </div>
                    <Link
                        className="ui column blue button space-top right-button"
                        // onClick={(e) => this.viewFeedback(e, file)}
                        to={`/feedback/${file.hash}`}
                    >
                        View feedback
                    </Link>
                    <Button
                        className="ui column blue purple space-top right-button"
                        onClick={(e) => this.openDocument(e, file)}>
                        Save document
                    </Button>
                </div>
            );
        });
        return <div className="file-list ui grid trhee column">{fileList}</div>;
    }
}
