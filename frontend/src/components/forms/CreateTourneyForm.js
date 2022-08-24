import React from "react";
import TournamentService from '../../services/TournamentService';

class CreateTourneyForm extends React.Component {
    constructor(props) {
        super(props);
        this.error = false;
        this.state = {
            tourneyName: '',
            creatorName: '',
            playerCount: ''
        }
        this.socket = props.socket;

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
    clearForm(){
        let keys = Object.keys(this.state)
        keys.forEach((key) => {
            this.state[key] = '';
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if(TournamentService.saveTournament(this.state, this.socket)){
            this.clearForm();
            this.error = false
        }else{
            this.error = true;
        }
    }
    render() {

        if(this.error){
            return <h1>ERROR SAVING TOURNEY</h1>
        }else {

            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Tournament Name:
                        <input type="text" name="tourneyName" value={this.state.tourneyName}
                               onChange={this.handleChange}/>
                    </label>
                    <label>
                        Creator Name:
                        <input type="text" name="creatorName" value={this.state.creatorName}
                               onChange={this.handleChange}/>
                    </label>
                    <label>
                        Total Player Count:
                        <input type="number" name="playerCount" value={this.state.playerCount}
                               onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            );
        }
    }
}export default CreateTourneyForm;