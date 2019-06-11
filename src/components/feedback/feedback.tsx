import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";

import AddFeedback from "./feedback components/AddFeedback";
import Feedbacklist from "./feedback components/Feedbacklist";
import Filelist from "./feedback components/Filelist";

export default class Feedback extends React.Component<any, any> {
    public state = {
        selectedUrl: "",
        files: [
            { hash: "8efd86fb78a56a5145ed7739dcb00c78581c5375", feedback: [""] },
            { hash: "86f7e437faa5a7fce15d1ddcb9eaeaea377667b8", feedback: [""] },
            { hash: "e9d71f5ee7c92d6dc9e92ffdad17b8bd49418f98", feedback: [""] },
            { hash: "e9d71f5ee7c92d6dc9e92ffdad17b8b349418f98", feedback: [""] },
            { hash: "e9d71f5ee7c92d6dc9e92ffdad17b8b449418f98", feedback: [""] },
        ],
    };
    public selectFeedback = (url) => {
        this.setState({
            selectedUrl: url,
        });
    };
    public addFeedback = (feedback: string) => {
        console.log("test" + feedback);
        const url = this.state.selectedUrl;
        let files = [...this.state.files];
        files.forEach(function(entry) {
            if (entry.hash === url) {
                entry.feedback.push(feedback);
                console.log(entry);
            }
        });
        files = [...this.state.files];
        console.log(files);
        this.setState({
            files,
        });
    };

    public render() {
        return (
            <div className="">
                <h1 className="">Feedback - Blockr</h1>
                <div className="Filelist">
                    <h2 className="werkstukkenHeader ui">Werkstukken</h2>
                    <Filelist files={this.state.files} selectFeedback={this.selectFeedback} />
                </div>
                <div className="Feedback">
                    <h2 className="ui row">Feedback toevoegen</h2>
                    <AddFeedback addFeedback={this.addFeedback} />
                </div>
                <Link className="ui bottom button centered back" to="/profile">
                    Back
                </Link>
            </div>
        );
    }
}
