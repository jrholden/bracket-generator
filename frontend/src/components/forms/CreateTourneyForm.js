import React from "react";
import TournamentService from '../../services/TournamentService';

class CreateTourneyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tourneyName: '',
            creatorName: '',
            playerCount: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        alert("Tournament Name: " + this.state.tourneyName + "\n" + "Created by: " + this.state.creatorName + "\n" + "Total Players: "+this.state.playerCount);
        event.preventDefault();
        console.log(this.state);
        TournamentService.saveTournament(this.state);
    }
    render() {
        return (
            <form  onSubmit={this.handleSubmit}>
                <label>
                    Tournament Name:
                    <input type="text" name="tourneyName" value={this.state.tourneyName} onChange={this.handleChange} />
                </label>
                <label>
                    Creator Name:
                    <input type="text" name="creatorName" value={this.state.creatorName} onChange={this.handleChange} />
                </label>
                <label>
                    Total Player Count:
                    <input type="number" name="playerCount" value={this.state.playerCount} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}export default CreateTourneyForm;