import React from 'react';
import AdminService from "../services/AdminService";
import TokenHelper from "../auth/TokenHelper";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorized: false
        };
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

    render() {
        if (this.state.authorized) {
            return (
                <h1>Admin Page:: You are allowed!!</h1>
            )
        } else {
            return (
                <h1>Not Allowed!</h1>
            )
        }
    }
}

export default Admin;