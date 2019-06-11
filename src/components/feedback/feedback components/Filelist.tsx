import * as React from 'react';

export default class Filelist extends React.Component<any, any> {
    public handleClick = (e, file) => {
        console.log(file.url);
        // download document
        window.open(file.url);
        this.props.selectFeedback(file.url);
    };
    public render() {
        const { files } = this.props;
        const fileList = files.map(file => {
            return (
                <div className="file" key={file.url} onClick={e => this.handleClick(e, file)}>
                    <div>{file.name}</div>
                    <div>{file.date}</div>
                </div>
            );
        });
        return <div className="file-list">{fileList}</div>;
    }
}
