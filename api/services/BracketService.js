const BracketModel = require('../database/models/Bracket');
const {Error} = require("mongoose");
const UserModel = require("../database/models/User");
const PromiseService = require('./PromiseService');
const BracketTreeService = require('./BracketTreeService');

exports.createBracket = (data, callback) => {
    BracketTreeService.createBracket(data, function(err, bracket){
        if(err) {
            callback(new Error("Could not create TREE:: "+err));
            return;
        }
        BracketTreeService.saveTree(bracket, function(err,data){
            if(err) {
                callback(new Error("Could not SAVE TREE "+err));
                return;
            }
            BracketTreeService.getMatches(bracket, function(err, allMatches){
                if(err) {
                    callback(new Error("ERROR GETTING MATCHES "+err));
                    return;
                }
                callback(null, allMatches);
            })
        })
    })
}

//use promise service
exports.saveBracket = (data, callback) => {
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
        if (error) callback(error);
        else callback(null, brackets);
    })
}
exports.getBracketsForTournament = (tournamentId, callback) => {
    PromiseService.getBracketsForTournamentPromise(tournamentId).then(function(brackets){
        callback(null, brackets);
    }).catch(err => {
        callback(err);
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