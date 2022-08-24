import React from 'react';
import {Link} from "react-router-dom";

class TourneyCard extends React.Component {
    constructor(props) {
        super(props);
        this.fullTournament = props.fullTournament
        this.url = "/tourney/"+this.fullTournament.tournament._id;
    }
    render(){
        return (
            <div  className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div className="card">
                    <img className="card-img-top" src="" alt="Card cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{this.fullTournament.tournament.title}</h5>
                        <p className="card-text">PlayerCount: {this.fullTournament.usersObj.playerCount}</p>
                        <p className="card-text">PlayerCount: {this.fullTournament.creatorObj.name}</p>
                        <Link to={this.url} className="btn btn-primary">View Tournament</Link>
                    </div>
                </div>
            </div>
        )
    }
}export default TourneyCard;