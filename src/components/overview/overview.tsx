import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';

import Filelist from './feedback/Filelist';
import { ApiService } from '../../services/apiService';
const apiService: ApiService = new ApiService();
export default class Overview extends React.Component<any, any> {
    public state = {
        files: apiService.getAllDocumentsWithFeedback(),
        selectedHash: ''
    };
    public selectFeedback = hash => {
        this.setState({
            selectedHash: hash
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
