import React from 'react';
import {useParams} from "react-router-dom";
import TourneyDetails from "./views/TourneyDetails";


class Tournament extends React.Component {
    constructor(props) {
        super(props);
        this.params = props.params;
        this.id = this.params.id;
    }

    render(){
        return (
            <TourneyDetails id={this.id}/>
        )
    }
}
export default (props) => (
    <Tournament {...props} params={useParams()} />
);