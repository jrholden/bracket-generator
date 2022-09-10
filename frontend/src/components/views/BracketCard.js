import React from 'react';
import BracketService from "../../services/BracketService";

class BracketCard extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
/*        this.bracketProps = {
            playerCount: 1000,
            typeIndex: 0
        }
        BracketService.createBracket(this.bracketProps).then(function(data){
            console.log(data);
        })*/
    }
    render() {
        return (<h1>Bracket Card</h1>)
    }
}export default BracketCard;