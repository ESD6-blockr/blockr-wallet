import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";

export default class Filelist extends React.Component<any, any> {
    public viewFeedback = (e, file) => {
        console.log("feedback: " + file.hash);
        window.open(file.hash);
        this.props.selectFeedback(file.hash);
    };
    public openDocument = (e, file) => {
        console.log("download: " + file.hash);
        // download document
        window.open(file.hash);
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
                    <Button
                        className="ui column blue button space-top right-button"
                        onClick={(e) => this.viewFeedback(e, file)}
                    >
                        View feedback
                    </Button>
                    <Button
                        className="ui column blue purple space-top right-button"
                        onClick={(e) => this.openDocument(e, file)}
                    >
                        Open document
                    </Button>
                </div>
            );
        });
        return <div className="file-list ui grid trhee column">{fileList}</div>;
    }
}
