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
                    <div key={(tournament.tournament._id).toString()} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div className="card">
                            <img className="card-img-top" src="" alt="Card cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{tournament.tournament.title}</h5>
                                <p className="card-text">PlayerCount: {tournament.usersObj.playerCount}</p>
                                <p className="card-text">PlayerCount: {tournament.creatorObj.name}</p>
                                <a className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
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