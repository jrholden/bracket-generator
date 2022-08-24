import React from 'react';
import AdminService from "../services/AdminService";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorized: false
        };
        this.token = {secret: '12345'};
    }

    componentDidMount() {
        let self = this;
        AdminService.authAdmin(this.token).then(function (isAuthed) {
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