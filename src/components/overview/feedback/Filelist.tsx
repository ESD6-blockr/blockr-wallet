import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { getIPFSIp } from '../../application';

export class Filelist extends React.Component<any, any> {
    public viewFeedback = file => {
        this.props.selectFeedback(file.hash);
    };
    public openDocument = file => {
        window.open(getIPFSIp() + '/api/ipfs/' + file.hash);
        this.props.selectFeedback(file.hash);
    };
    public render() {
        const { files } = this.props;
        const fileList = files.map(file => {
            return (
                <div className="ui segment" key={file.hash} style={{ margin: 0 }}>
                    <div className="ui column" onClick={() => this.viewFeedback(file)}>
                        {file.hash}
                    </div>
                    <Link
                        className="ui column blue button space-top right-button"
                        to={`/feedback/${file.hash}`}
                    >
                        View feedback
                    </Link>
                    <Button
                        className="ui column blue purple space-top right-button"
                        onClick={() => this.openDocument(file)}
                    >
                        Save document
                    </Button>
                </div>
            );
        });
        return <div className="file-list ui grid trhee column">{fileList}</div>;
    }
}
