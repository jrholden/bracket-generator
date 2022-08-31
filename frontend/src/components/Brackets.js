import React from 'react';
import BracketCard from "./views/BracketCard";
import CreateTourneyForm from "./forms/CreateTourneyForm";

class Brackets extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <CreateTourneyForm/>
                <BracketCard/>
            </div>
        )
    }
}

export default Brackets;