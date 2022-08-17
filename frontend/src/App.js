import React from "react";
import CreateTourneyForm from "./components/forms/CreateTourneyForm";
import ActiveTourneys from "./components/lists/ActiveTourneys"

class App extends React.Component {
    render() {
        return (
            <div>
                <CreateTourneyForm/>
                <ActiveTourneys/>
            </div>
        )
    }
}

export default App;