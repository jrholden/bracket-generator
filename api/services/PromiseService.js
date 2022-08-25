const Promise = require("promise");
const TournamentModel = require("../database/models/Tournament");
const UserService = require("./UserService");
const UsersObjService = require("./UsersObjService");


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

exports.getUsersObjPromise = (usersObjId) => {
    return new Promise(function (resolve, reject) {
        UsersObjService.getUsersObjFromId(usersObjId, function (error, usersObj) {
            if (error) reject(error);
            resolve(usersObj);
        });
    });
}

exports.getSaveTournamentPromise = (data) => {
    const {title, creatorId, playersObjId} = data;
    return new Promise(function (resolve, reject) {
        const newTournament = new TournamentModel({
            title: title,
            creatorId: creatorId,
            playersObjId: playersObjId
        });
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

exports.getSaveUsersObjPromise = (data) => {
    const {playerCount} = data;
    return new Promise(function (resolve, reject) {
        UsersObjService.saveUsersObj({playerCount}, function (err, usersObj) {
            if (err) reject(err);
            else resolve(usersObj);
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
