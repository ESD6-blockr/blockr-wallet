import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Label, List, Segment } from "semantic-ui-react";
import { ApiService } from "../../../services/apiService";
import AddFeedback from "../feedback/AddFeedback";
const apiService = new ApiService();
export default class Feedback extends React.Component<any, any> {
    public state = {
        feedback: "",
        gottenFeedback: apiService.getFeedbackForDocumentIPFSHash(this.props.match.params.hash),
    };
    public handleChange = (e, data) => {
        this.state.feedback = data.value;
    };
    public handleSubmit = (e, data) => {
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        if (!(this.state.feedback.length === 0)) {
            const gotten = [...this.state.gottenFeedback];
            gotten.push({ value: this.state.feedback, pubKey: "PUBLICKEYOFUSER", time: timestamp });
            apiService.addFeedbackInDocument(this.props.match.params.hash,this.state.feedback);
            this.setState({ gottenFeedback: gotten, feedback: "" });
        }
    };

    public render() {
        return (
            <div>
                <h2>{this.props.match.params.hash}</h2>
                <div>
                    <h2>Feedback:</h2>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <List>
                        {this.state.gottenFeedback.map((fb) => (
                            <Segment key={fb.value}>
                                <List.Item>Value: {fb.value}</List.Item>
                                <List.Item>User: {fb.pubKey}</List.Item>
                                <List.Item>Time: {fb.time}</List.Item>
                            </Segment>
                        ))}
                    </List>
                    <div className="Feedback">
                        <h2 className="ui row">Feedback toevoegen</h2>
                        <div className="row ui">
                            <Label>Feedback:</Label>
                            <Input type="text" id="feedback" onChange={this.handleChange} />
                            <Button className="ui column blue purple space-top left-button">
                                Toevoegen
                            </Button>
                        </div>
                    </div>
                </Form>
                <Link
                    className="ui bottom button centered back space-top"
                    to="/feedback"
                    style={{ marginTop: 20 }}
                >
                    Back
                </Link>
            </div>
        );
    }
}
