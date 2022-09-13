const Promise = require("promise");
const TournamentModel = require("../database/models/Tournament");
const UserService = require("./UserService");
const BracketService = require("./BracketService");
const NodeService = require("./NodeService");



exports.getNodesPromise = (bracketId) => {
    return new Promise(function (resolve, reject) {
        NodeService.getNodes(bracketId, function (err, nodes) {
            if (err) reject(err);
            resolve(nodes);
        })
    });
}
exports.getSaveNodePromise = (node) => {
    return new Promise(function (resolve, reject) {
        NodeService.saveNode(node, function (err, nodes) {
            if (err) reject(err);
            resolve(nodes);
        })
    });
}

exports.getOnePromiseForMany = (promises, originalObj) => {
    return new Promise(function (resolve, reject) {
        Promise.all(promises).then(function (response) {
            resolve({res: response, original: originalObj});
        }).catch(error => {
            reject(error);
        });
    });
}
exports.getTournamentPromise = (id) => {
    return new Promise(function (resolve, reject) {
        TournamentModel.findById(id, function (err, tournament) {
            if (err) reject(err);
            resolve(tournament);
        })
    });
}

exports.getTournamentsPromise = () => {
    return new Promise(function (resolve, reject) {
        TournamentModel.find(function (error, results) {
            if (error) reject(error);
            resolve(results);
        });
    });
}

exports.getCreatorPromise = (userId) => {
    return new Promise(function (resolve, reject) {
        UserService.getUserFromId(userId, function (error, user) {
            if (error) reject(error);
            resolve(user);
        });
    });
}
exports.getBracketsPromise = (tournamentId) => {
    return new Promise(function (resolve, reject) {
        BracketService.getBrackets(tournamentId, function (error, brackets){
            if (error) reject(error);
            resolve(brackets);
        })
    })
}

exports.getBracketPromise = (bracketId) => {
    return new Promise(function (resolve, reject) {
        BracketService.getBracketFromId(bracketId, function (error, bracket) {
            if (error) reject(error);
            resolve(bracket);
        });
    });
}

exports.getSaveTournamentPromise = (data) => {
    return new Promise(function (resolve, reject) {
        const newTournament = new TournamentModel(data);
        newTournament.save(function (error, newTournament) {
            if (error) reject(error);
            resolve(newTournament);
        });
    });
}

exports.getSaveUserPromise = (data) => {
    const {creatorName} = data;
    return new Promise(function (resolve, reject) {
        UserService.saveUser({creatorName}, function (err, user) {
            if (err) reject(err);
            else resolve(user);
        });
    });
}

exports.getSaveBracketPromise = (data) => {
    return new Promise(function (resolve, reject) {
        BracketService.saveBracket(data, function (err, bracket) {
            if (err) reject(err);
            else resolve(bracket);
        });
    })
}
exports.getDeleteOnePromise = (id) => {
    return new Promise(function (resolve,reject){
        TournamentModel.findByIdAndDelete(id, function(err, deletedDoc){
            if (err) reject(err);
            else resolve(deletedDoc);
        })
    })
}

exports.getDeleteManyUsersPromise = (filterObj) => {
    return new Promise(function (resolve,reject){
        UserService.deleteManyUsers(filterObj, function(err, deletedCount){
            if (err) reject(err);
            else resolve(deletedCount);
        })
    })
}
exports.getDeleteManyBracketPromise = (filterObj) => {
    return new Promise(function (resolve,reject){
        BracketService.deleteManyBrackets(filterObj, function(err, deletedCount){
            if (err) reject(err);
            else resolve(deletedCount);
        })
    })
}
exports.getDeleteManyTourneysPromise = (filterObj) => {
    return new Promise(function (resolve,reject){
        TournamentModel.deleteMany(filterObj, function(err, deletedCount){
            if (err) reject(err);
            else resolve(deletedCount);
        })
    })
}
