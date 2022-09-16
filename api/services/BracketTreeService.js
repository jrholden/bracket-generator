const config = require('../constants');
const BracketTree = require("../tournament_tree/BracketTree");
const NodeService = require("./NodeService");
const PromiseService = require("./PromiseService");

exports.getBracket = (id) => {

}
exports.getBrackets = () => {
    console.log("bracketService");
}
exports.saveTree = (bracketTree, callback) => {
    let promises = [], nodes = [];

    nodes = bracketTree.getNodesInOrder(bracketTree.rootNode, nodes);
    nodes.forEach(node => {
        node.bracketId = bracketTree.bracketId;
        promises.push(PromiseService.getSaveNodePromise(node));
    });
    PromiseService.getOnePromiseForMany(promises, {}).then(function (savedNodes) {
        callback(null, savedNodes.res);
    }).catch(err => {
        callback(err);
    })

}
exports.getMatches = (bracketTree,callback) => {
    console.log(bracketTree);
    callback(null, bracketTree.getAllMatches());
}
exports.createBracket = (props, callback) => {
    let {playerCount, typeIndex} = props;

    let type = config.bracket.tournamentTypes[typeIndex];
    let bracket = new BracketTree({playerCount: playerCount, useStretch: true});
    bracket.bracketId = props._id;
    bracket.init();


    callback(null, bracket);
}