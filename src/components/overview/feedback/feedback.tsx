import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Label, List, Segment } from 'semantic-ui-react';
import { ApiService } from '../../../services/apiService';
import { IRootState } from 'reducers';
const apiService = new ApiService();

export default class Feedback extends React.Component<any, any> {
    public state = {
        feedback: '',
        receivedFeedback: apiService.getFeedbackForDocumentIPFSHash(this.props.match.params.hash)
    };
    public handleChange = (e, data) => {
        this.state.feedback = data.value;
    };
    public handleSubmit = () => {
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        if (!(this.state.feedback.length === 0)) {
            const received = [...this.state.receivedFeedback];
            received.push({
                value: this.state.feedback,
                pubKey: 'PUBLICKEYOFUSER',
                time: timestamp
            });
            apiService.addFeedbackInDocument(
                this.props.match.params.hash,
                this.state.feedback,
                'PUBLICKEYOFUSER'
            );
            this.setState({ receivedFeedback: received, feedback: '' });
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
                        {this.state.receivedFeedback.map(fb => (
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
