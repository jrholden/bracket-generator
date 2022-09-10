import React from 'react';
import {Link} from "react-router-dom";
import TournamentService from "../../services/TournamentService";

class TourneyCard extends React.Component {
    constructor(props) {
        super(props);
        this.fullTournament = props.fullTournament
        this.url = "/tourney/" + this.fullTournament.tournament._id;
        this.isAdmin = props.isAdmin;

        this.deleteTournament = this.deleteTournament.bind(this);
    }

    componentDidMount() {
    }
    deleteTournament(){
        let id = this.fullTournament.tournament._id;
        TournamentService.deleteTournament(id).then(function(success){
            if (success){
                alert("Tournament Deleted!");
            }else{
                alert("Tournament could not be deleted!");
            }
        })
    }

    render() {
        let button = [];
        if (this.isAdmin) {
            button.push(<button onClick={this.deleteTournament} key='0' type="button" className="btn btn-danger">Delete</button>);
        }
        return (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div className="card">
                    <img className="card-img-top" src="" alt="Card cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{this.fullTournament.tournament.title}</h5>
                        <p className="card-text">PlayerCount: {this.fullTournament.tournament.playerCount}</p>
                        <p className="card-text">Creator: {this.fullTournament.creatorObj.name}</p>
                        <Link to={this.url} className="btn btn-primary">View Tournament</Link>
                        {button}
                    </div>
                </div>
            </div>
        )
    }
}

export default TourneyCard;