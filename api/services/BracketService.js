const BracketModel = require('../database/models/Bracket');
const {Error} = require("mongoose");
const UserModel = require("../database/models/User");
const PromiseService = require('./PromiseService');
const BracketTreeService = require('./BracketTreeService');

exports.createBracket = (data, callback) => {
    this.saveBracket({tournamentId: data._id,playerSlots: data.playerCount, typeIndex:0}, function (err, bracket) {
        if (err) {
            console.log(err);
            callback(new Error("Could not SAVE BRACKET:: " + err));
            return;
        }
        console.log(data);
        console.log(bracket);
        BracketTreeService.createBracket(data, function (err, bracketTree) {
            if (err) {
                callback(new Error("Could not create TREE:: " + err));
                return;
            }
            BracketTreeService.saveTree(bracketTree, function (err, data) {
                if (err) {
                    callback(new Error("Could not SAVE TREE " + err));
                    return;
                }
                BracketTreeService.getMatches(bracketTree, function (err, allMatches) {
                    if (err) {
                        callback(new Error("ERROR GETTING MATCHES " + err));
                        return;
                    }
                    callback(null, allMatches);
                })
            })
        })
    })
}

//use promise service
exports.saveBracket = (data, callback) => {
    PromiseService.getSaveBracketPromise(data).then(function (bracket) {
        callback(null, bracket);
    }).catch(err => {
        callback(err);
    })
}
exports.getBrackets = (tournamentId, callback) => {
    BracketModel.find({tournamentId: tournamentId}, function (error, brackets) {
        if (error) callback(error);
        else callback(null, brackets);
    })
}
exports.getBracketsForTournament = (tournamentId, callback) => {
    PromiseService.getBracketsForTournamentPromise(tournamentId).then(function (brackets) {
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
exports.deleteManyBrackets = (filterObj, callback) => {
    BracketModel.deleteMany(filterObj, function (err, deletedCount) {
        if (err) callback(err);
        else callback(null, deletedCount);
    })
}