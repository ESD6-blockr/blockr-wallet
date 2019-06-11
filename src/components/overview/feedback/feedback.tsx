import * as React from 'react';
import { Link } from 'react-router-dom';
import AddFeedback from '../feedback/AddFeedback';
export default class Feedback extends React.Component<any, any> {
    public addFeedback = (feedback: string) => {
        const hash = this.state.selectedHash;
        let files = [...this.state.files];
        files.forEach(function(entry) {
            if (entry.hash === hash) {
                entry.feedback.push(feedback);
                console.log(entry);
            }
        });
        files = [...this.state.files];
        this.setState({
            files
        });
    };

    public render() {
        return (
            <div>
                <h2>{this.props.match.params.hash}</h2>
                <div>
                    <h2>Feedback:</h2>
                </div>
                <div className="Feedback">
                    <h2 className="ui row">Feedback toevoegen</h2>
                    <AddFeedback addFeedback={this.addFeedback} />
                </div>
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
