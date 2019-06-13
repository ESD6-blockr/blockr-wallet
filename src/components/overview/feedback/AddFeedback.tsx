import { thisExpression } from "@babel/types";
import * as React from "react";
import { Button, Form, Input, Label, List } from "semantic-ui-react";
import { ApiService } from "../../../services/apiService";

const apiService = new ApiService();
export default class AddFeedback extends React.Component<any, any> {
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
            this.setState({ gottenFeedback: gotten, feedback: "" });
        }
    };
    public render() {
        return (
            <div className="row ui">
                <Form onSubmit={this.handleSubmit}>
                    <Label>Feedback:</Label>
                    <List>
                        {this.state.gottenFeedback.map((fb) => (
                            <List.Item key={fb.value}>{fb}</List.Item>
                        ))}
                    </List>
                    <Input type="text" id="feedback" onChange={this.handleChange} />
                    <Button className="ui column blue purple space-top left-button">
                        Toevoegen
                    </Button>
                </Form>
            </div>
        );
    }
}
