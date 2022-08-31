import React from 'react';
import BracketCard from "./views/BracketCard";
import CreateTourneyForm from "./forms/CreateTourneyForm";

class Brackets extends React.Component {
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
                <BracketCard/>
            </div>
        )
    }
}

export default Brackets;