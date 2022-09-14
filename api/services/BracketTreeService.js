

const config = require('../constants');
const BracketTree = require("../tournament_tree/BracketTree");
const NodeService = require("./NodeService");
const PromiseService = require("./PromiseService");
const {saveNode} = require("./NodeService");

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
    PromiseService.getOnePromiseForMany(promises, {}).then(function (savedNodes){
        callback(null, savedNodes.res);
    }).catch(err => {
        callback(err);
    })

}
exports.getMatches = (bracketTree) => {
    return bracketTree.getAllMatches();
}
exports.createBracket = (props, callback) => {
    let {playerSlots, typeIndex} = props;

    let type = config.bracket.tournamentTypes[typeIndex];
    let bracket = new BracketTree({playerCount:playerSlots, useStretch:true});
    bracket.bracketId = props._id;
    bracket.init();

    this.saveTree(bracket, function(err, savedNodes) {
        if(err) {
            callback(err);
            return;
        }
        let testBracket = new BracketTree({playerCount:playerSlots, useStretch:true});
        testBracket.loadNodes((savedNodes.length+1)/2, null,savedNodes,0);
        console.log(testBracket.leaves);
        callback(null, bracket);
    });
}