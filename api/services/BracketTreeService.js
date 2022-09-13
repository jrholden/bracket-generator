

const config = require('../constants');
const BracketTree = require("../tournament_tree/BracketTree");
const NodeService = require("./NodeService");

exports.getBracket = (id) => {

}
exports.getBrackets = () => {
    console.log("bracketService");
}
exports.saveTree = (bracketTree, callback) => {
    let nodes = [], savedNodes = [];
    nodes = bracketTree.getNodesInOrder(bracketTree.rootNode, nodes);
    console.log(nodes);
    nodes.forEach(node => {
        NodeService.saveNode(node, function (err, node){
            if (err) {
                callback(err);
                return;
            }
            savedNodes.push(node);
        })
    })
    callback(null, savedNodes)
}
exports.getMatches = (bracketTree) => {
    return bracketTree.getAllMatches();
}
exports.createBracket = (props, callback) => {
    let {playerSlots, typeIndex} = props;
    let type = config.bracket.tournamentTypes[typeIndex];
    console.log("Players: "+playerSlots+"\nType: "+type);
    let bracket = new BracketTree({playerCount:playerSlots, useStretch:true});
    this.saveTree(bracket, function(err, savedNodes) {
        if(err) {
            callback(err);
            return;
        }
        console.log(savedNodes);
    });

    callback(null, bracket);
}