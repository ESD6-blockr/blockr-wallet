import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";

import AddFeedback from "./feedback/AddFeedback";
import Feedbacklist from "./feedback/Feedbacklist";
import Filelist from "./feedback/Filelist";

export default class Overview extends React.Component<any, any> {
    public state = {
        files: [
            { feedback: [""], hash: "QmXGuMJBBrJz8iFhvigjsNpRMDiGms2Y18kH5PmYJdUVKS" },
            { feedback: [""], hash: "QmbcXF47Xf8aye8eRUoLTBrLJVqeptNjZLDHW3aYt79cjF" },
            { feedback: [""], hash: "QmWScQUnnhcoLrgGU1H7sWv1vNc38djz2kEmQD7dzmjsEC" },
        ],
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
                <div className="Filelist">
                    <h2 className="werkstukkenHeader ui">Werkstukken</h2>
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
