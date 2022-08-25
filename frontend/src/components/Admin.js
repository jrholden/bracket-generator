import React from 'react';
import AdminService from "../services/AdminService";
import TokenHelper from "../auth/TokenHelper";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorized: false
        };

        this.deleteEverything = this.deleteEverything.bind(this);
        this.deleteAllTourneys = this.deleteAllTourneys.bind(this);
    }

    componentDidMount() {
        TokenHelper.setTokenThenFreeze({secret: '12345'});
        let token = TokenHelper.getToken();
        let self = this;
        AdminService.authAdmin(token).then(function (isAuthed) {
            self.setState({
                authorized: isAuthed
            });
        })
    }
    deleteAllTourneys(){
        AdminService.deleteAllTourneys().then(function(deleteCount){
            if(deleteCount){
                alert("DELETED ALL TOURNEYS:: COUNT:: "+deleteCount);
            }else{
                alert("Could not delete all tourneys");
            }
        })
    }
    deleteEverything(){
        AdminService.deleteAllData().then(function(deleteCountObj){
            if(deleteCountObj){
                alert("DELETED EVERYTHING\nTournaments: "+deleteCountObj.tourneys+"\nUsers: "+deleteCountObj.users+"\nUsersObjects: "+deleteCountObj.usersObj);
            }else{
                alert("Could not delete EVERYTHING");
            }
        })
    }

    render() {
        if (this.state.authorized) {
            return (
                <div className={"container-fluid"}>
                    <button onClick={this.deleteEverything} type="button" className="btn btn-danger">Delete EVERYTHING</button>
                    <button onClick={this.deleteAllTourneys} type="button" className="btn btn-danger">Delete ALL TOURNEYS</button>
                </div>
            )
        } else {
            return (
                <h1>Not Allowed!</h1>
            )
        }
    }
}

export default Admin;