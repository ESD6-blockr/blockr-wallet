import * as React from "react";

export default class Feedbacklist extends React.Component<any, any> {
    public render() {
        const { files } = this.props;
        const feedbacklist = files.map((file) => {
            file.feedback.map((feedback) => {
                return <div className="comment">{feedback[1]}</div>;
            });
        });
        return <div className="feedbacklist">{feedbacklist}</div>;
    }
}
