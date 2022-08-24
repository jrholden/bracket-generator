import React from 'react';
import TournamentService from '../../services/TournamentService';
import TourneyCard from "../views/TourneyCard";


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
            this.state.tournaments.forEach((fullTournament) => {
                list.push(
                    <TourneyCard key={(fullTournament.tournament._id).toString()} fullTournament={fullTournament}/>
                )
            })
        }
        return (
            <div className={'container text-center'}>
                <h1>Active Tournaments</h1>
                <div className={"row align-items-center"}>
                    {list}
                </div>
            </div>
        )
    }
}

export default ActiveTourneys;