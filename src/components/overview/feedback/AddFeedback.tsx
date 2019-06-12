import { thisExpression } from "@babel/types";
import * as React from "react";
import { Button, Form, Input, Label, List } from "semantic-ui-react";

export default class AddFeedback extends React.Component<any, any> {
    public state = {
        feedback: "",
        gottenFeedback: [
            { id: 0, feedback: "was gucci vriend" },
            { id: 1, feedback: "was wel ok" },
            { id: 2, feedback: "wie heeft er zin in hizmet?" },
        ],
    };
    public handleChange = (e, data) => {
        this.state.feedback = data.value;
    };
    public handleSubmit = (e, data) => {
        if (!(this.state.feedback.length === 0)) {
            const gotten = [...this.state.gottenFeedback];
            gotten.push({
                feedback: this.state.feedback,
                id: this.state.gottenFeedback.length + 1,
            });
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
                            <List.Item key={fb.id}>{fb.feedback}</List.Item>
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
