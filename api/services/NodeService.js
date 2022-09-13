const NodeModel = require('../database/models/Node');
const {Error} = require("mongoose");

exports.saveNode = (data, callback) => {
    const node = new NodeModel(data);

    node.save(function(error, node){
        if (error) callback(error);
        else callback(null, node)
    })
}
exports.getNodes = (bracketId, callback) => {
    NodeModel.find({bracketId: bracketId}, function (error,nodes){
        if (error) callback(error);
        else callback(null, nodes);
    })
}