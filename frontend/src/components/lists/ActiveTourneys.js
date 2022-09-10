import React from 'react';
import TournamentService from '../../services/TournamentService';
import TourneyCard from "../views/TourneyCard";
import AdminService from "../../services/AdminService";
import TokenHelper from "../../auth/TokenHelper";

class ActiveTourneys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tournaments: []
        }
        this.loading = true;
    }

    componentDidMount() {
        const self = this;
        TournamentService.getTournaments().then(function (tournaments) {
            self.setState({
                tournaments: tournaments
            });
            return AdminService.authAdmin(TokenHelper.getToken());
        }).then(function (isAdmin) {
            self.setState({
                isAdmin: isAdmin
            });
        }).finally(function () {
            self.loading = false;
        });
    }

    render() {
        /** CLEAN THIS UP LOL **/
        let list = [];
        if ((this.state.tournaments).length < 1) {
            list.push(<p key='0'>No Active Tournaments</p>);
        } else if (!this.state.tournaments) {
            list.push(<p key='0'>Error getting Tournaments!!</p>)
        } else {
            if (this.loading) {
                list = null;
            } else {
                this.state.tournaments.forEach((fullTournament) => {
                    list.push(
                        <TourneyCard key={(fullTournament.tournament._id).toString()} isAdmin={this.state.isAdmin}
                                     fullTournament={fullTournament}/>
                    )
                })
            }
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