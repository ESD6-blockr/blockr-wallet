import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "reducers";
import { Button, Form, Input, Label, List, Segment } from "semantic-ui-react";
import { ApiService } from "../../../services/apiService";

const apiService = new ApiService();

const mapStateToProps = (state: IRootState) => ({
    currentUser: state.authentication.currentUser,
});

type Props = ReturnType<typeof mapStateToProps> & any;

class Feedback extends React.Component<Props> {
    public state = {
        feedbackFieldValue: "",
        receivedFeedback: apiService.getFeedbackForDocumentIPFSHash(this.props.match.params.hash),
    };

    constructor(props: any) {
        super(props);
    }

    public handleChange = (e, data) => {
        this.state.feedbackFieldValue = data.value;
    };
    public handleSubmit = () => {
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        if (!(this.state.feedbackFieldValue.length === 0)) {
            const received = [...this.state.receivedFeedback];
            received.push({
                pubKey: this.props.currentUser.publicKey,
                time: timestamp,
                value: this.state.feedbackFieldValue,
            });
            apiService.addFeedbackInDocument(
                this.props.match.params.hash,
                this.state.feedbackFieldValue,
                this.props.currentUser.publicKey,
            );
            this.setState({ receivedFeedback: received, feedbackFieldValue: "" });
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
                        {this.state.receivedFeedback.map((fb) => (
                            <Segment key={fb.value}>
                                <List.Item>Value: {fb.value}</List.Item>
                                <List.Item>User: {fb.pubKey}</List.Item>
                                <List.Item>Time: {fb.time}</List.Item>
                            </Segment>
                        ))}
                    </List>
                    <div className="Feedback">
                        <h2 className="ui row">Add feedback to document:</h2>
                        <div className="row ui">
                            <Label>Feedback:</Label>
                            <Input type="text" id="feedback" onChange={this.handleChange} />
                            <Button className="ui column blue purple space-top left-button">
                                Add
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
export default connect(mapStateToProps)(Feedback);
