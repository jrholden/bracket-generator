import React from 'react';
import TournamentService from '../../services/TournamentService';

class ActiveTourneys extends React.Component {
    constructor(props) {
        super(props);
        //init active with DB call
        this.state = {
            tournaments: []
        }
        const self = this;
        TournamentService.getTournaments().then(function(tournaments){
            self.setState({
                tournaments: tournaments
            })
        });
    }

    render() {
        let list = [];
        console.log(this.state.tournaments);
        if ((this.state.tournaments).length < 1) {
            list.push(<p key='0'>No Active Tournaments</p>);
        } else {
            this.state.tournaments.forEach((tournament) => {
                list.push(<p key={(tournament._id).toString()}>{tournament.title}</p>)
            })
        }
        return (
            <div>
                <h1>Active Tournaments</h1>
                {list}
            </div>
        )
    }
}export default ActiveTourneys;