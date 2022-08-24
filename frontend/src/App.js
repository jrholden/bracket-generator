import React from "react";
import CreateTourneyForm from "./components/forms/CreateTourneyForm";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;

    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <CreateTourneyForm socket={this.socket}/>

            </div>
        )
    }
}

export default App;