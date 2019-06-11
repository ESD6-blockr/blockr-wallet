import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';

import AddFeedback from './feedback components/AddFeedback';
import Feedbacklist from './feedback components/Feedbacklist';
import Filelist from './feedback components/Filelist';

export default class Feedback extends React.Component<any, any> {
    public state = {
        selectedUrl: '1.example.com',
        files: [
            { name: 'werkstuk1', date: '01-01-2019', url: '1.example.com', feedback: [''] },
            { name: 'werkstuk2', date: '01-01-2019', url: '2.example.com', feedback: [''] },
            { name: 'werkstuk3', date: '01-01-2019', url: '3.example.com', feedback: [''] }
        ]
    };
    public selectFeedback = url => {
        this.setState({
            selectedUrl: url
        });
    };
    public addFeedback = (feedback: string) => {
        console.log('test' + feedback);
        const url = this.state.selectedUrl;
        let files = [...this.state.files];
        files.forEach(function(entry) {
            if (entry.url === url) {
                entry.feedback.push(feedback);
                console.log(entry);
            }
        });
        files = [...this.state.files];
        console.log(files);
        this.setState({
            files
        });
    };

    public render() {
        return (
            <div className="hidden">
                <h1>Feedback - Blockr</h1>
                <div className="Filelist">
                    <h2>Werkstukken</h2>
                    <Filelist files={this.state.files} selectFeedback={this.selectFeedback} />
                </div>
                <div className="Feedback">
                    <h2>Feedback toevoegen</h2>
                    <AddFeedback addFeedback={this.addFeedback} />
                </div>
            </div>
        );
    }
}
