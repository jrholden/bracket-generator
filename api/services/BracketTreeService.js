const Node = require('../tournament_tree/Node');

//Also easy!
const config = require('../constants');
const BracketTree = require("../tournament_tree/BracketTree");

exports.getBracket = (id) => {

}
exports.getBrackets = () => {
    console.log("bracketService");
}
exports.createBracket = (props, callback) => {
    let {playerCount, typeIndex} = props;
    let type = config.bracket.tournamentTypes[typeIndex];
    console.log("Players: "+playerCount+"\nType: "+type);
    let bracket = new BracketTree({playerCount:playerCount, useStretch:true});

    let matchUps = bracket.getAllMatches();
    console.log(bracket.leaves);

    callback(null, matchUps);
}