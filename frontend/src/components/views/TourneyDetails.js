import React from "react";
import TournamentService from "../../services/TournamentService";
import BracketService from "../../services/BracketService";

class TourneyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.tourneyId = props.id;
        this.hasBrackets = false;
        this.state = {};

        this.generateBracket = this.generateBracket.bind(this);
    }

    componentDidMount() {
        let self = this;
        if (!this.tourneyId) return;
        TournamentService.getOneTournament(this.tourneyId).then(function (tournament) {
            self.setState({
                tournament: tournament
            });
            return BracketService.getBrackets(self.tourneyId)
        }).then(function (brackets) {
            console.log(brackets);
            self.setState({
                brackets: brackets
            })


        }).catch(err => {
            alert("Could not create bracket || " + err.message);
        })
    }

    generateBracket() {
        console.log("Generating Bracket");
        BracketService.createBracket(this.state.tournament.tournament).then(function(brackets){
            console.log(brackets)
            self.setState({
                brackets: brackets
            })
        })
    }

    render() {

        if (this.state.tournament) {
            let bracketButton = [];
            if (this.state.brackets) {

                bracketButton.push(
                    <div key='0' >
                        <h1>No Brackets Currently</h1>
                        <p>Generate for: {this.state.tournament.tournament.playerCount} players::</p>
                        <button onClick={this.generateBracket} key='0' type="button"
                                className="btn btn-primary">Generate Bracket
                        </button>
                    </div>
                )
            }
            return (
                <div>
                    <h1>Tourney:: {this.state.tournament.tournament.title}</h1>
                    {bracketButton}
                </div>
            )
        } else {
            return <h1>Bad Tourney Selection</h1>
        }

    }

}

export default TourneyDetails;