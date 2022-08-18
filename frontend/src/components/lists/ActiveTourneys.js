import React from 'react';
import TournamentService from '../../services/TournamentService';

class ActiveTourneys extends React.Component {
    constructor(props) {
        super(props);
        //init active with DB call
        this.state = {
            tournaments: []
        }
    }

    componentDidMount() {
        const self = this;
        TournamentService.getTournaments().then(function (tournaments) {
            self.setState({
                tournaments: tournaments
            })
        });
    }

    render() {
        let list = [];
        if ((this.state.tournaments).length < 1) {
            list.push(<p key='0'>No Active Tournaments</p>);
        } else {
            this.state.tournaments.forEach((tournament) => {
                list.push(
                    <div key={(tournament.tournament._id).toString()}>
                        <p >Title: {tournament.tournament.title}</p>
                        <p>PlayerCount: {tournament.usersObj.playerCount}</p>
                        <p>Creator: {tournament.creatorObj.name}</p>
                    </div>
                )
            })
        }
        return (
            <div>
                <h1>Active Tournaments</h1>
                {list}
            </div>
        )
    }
}

export default ActiveTourneys;