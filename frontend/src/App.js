import React from "react";
import CreateTourneyForm from "./components/forms/CreateTourneyForm";
import ActiveTourneys from "./components/lists/ActiveTourneys"
import SocketService from "./services/SocketService";

let socket = new SocketService();
class App extends React.Component {
    constructor(props) {
        super(props);


    }
    componentDidMount() {
        socket.connect();
        socket.listen();
    }
    render() {
        return (
            <div>
                <CreateTourneyForm socket={socket}/>
                <ActiveTourneys/>
            </div>
        )
    }
}
App.defaultProps = {socket};
export default App;