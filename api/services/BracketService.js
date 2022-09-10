const BracketModel = require('../database/models/Bracket');
const {Error} = require("mongoose");
const UserModel = require("../database/models/User");

exports.saveBracket = (data, callback) => {

    console.log(data);
    const bracket = new BracketModel(data);
    bracket.save(function (error, bracket) {
        if (error) {
            console.log("BRACKET ERROR:: " + error);
            return callback(new Error("UserObj could not be saved:: " + error.message));
        }
        return callback(null, bracket);
    });
}
exports.getBrackets = (tournamentId, callback) => {
    BracketModel.find({tournamentId: tournamentId}, function (error,brackets){
        console.log(brackets);
        if (error) callback(error);
        else callback(null, brackets);
    })
}
exports.getBracketFromId = (bracketId, callback) => {
    BracketModel.findById(bracketId, function (error, bracket) {
        if (error) return callback(new Error("Cannot find BRACKET from ID :: " + error.message));
        return callback(null, bracket);
    });
}
exports.deleteManyBrackets = (filterObj,callback) => {
    BracketModel.deleteMany(filterObj, function(err, deletedCount){
        if (err) callback(err);
        else callback(null, deletedCount);
    })
}