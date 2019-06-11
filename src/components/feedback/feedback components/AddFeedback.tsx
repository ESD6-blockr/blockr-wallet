import * as React from "react";

export default class AddFeedback extends React.Component<any, any> {
    public state = {
        feedback: null,
    };
    public handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };
    public handleSubmit = (e) => {
        e.preventDefault();
        this.props.addFeedback(this.state);
    };
    public render() {
        return (
            <div className="row ui">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="feedback">Feedback:</label>
                    <input type="text" id="feedback" onChange={this.handleChange} />
                    <button>Verstuur</button>
                </form>
            </div>
        );
    }
}
