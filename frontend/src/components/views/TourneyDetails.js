import React from "react";
import TournamentService from "../../services/TournamentService";

class TourneyDetails extends React.Component{
    constructor(props) {
        super(props);
        this.tourneyId = props.id;
        this.state = {};
    }
    componentDidMount() {
        let self = this;
        TournamentService.getOneTournament(this.tourneyId).then(function (tournament) {
            self.setState({
                tournament: tournament
            });
        });
    }
    render() {
        if(this.state.tournament){
            return (<h1>Tourney:: {this.state.tournament.tournament.title}</h1>)
        }else{
            return <h1>Bad Tourney Selection</h1>
        }

    }

}export default TourneyDetails;