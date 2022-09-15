import React from "react";
import TournamentService from "../../services/TournamentService";
import BracketService from "../../services/BracketService";

class TourneyDetails extends React.Component{
    constructor(props) {
        super(props);
        this.tourneyId = props.id;
        this.state = {};
    }
    componentDidMount() {
        let self = this;
        if(!this.tourneyId) return;
        TournamentService.getOneTournament(this.tourneyId).then(function (tournament) {
            self.setState({
                tournament: tournament
            });
            return BracketService.getBrackets(self.tourneyId)
        }).then(function(brackets){
            console.log("hiiii");
            console.log(brackets);
        }).catch(err => {
            alert("Could not create bracket || "+ err.message);
        })
    }
    render() {
        if(this.state.tournament){
            return (
                <h1>Tourney:: {this.state.tournament.tournament.title}</h1>
            )
        }else{
            return <h1>Bad Tourney Selection</h1>
        }

    }

}export default TourneyDetails;