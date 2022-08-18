const TournamentModel = require('../database/models/Tournament');
const UserService = require('../services/UserService');
const UsersObjService = require('../services/UsersObjService');
const Promise = require('promise');

exports.saveTournament = (data, callback) => {
    //validate data
    console.log(data);
    const {tourneyName, creatorName, playerCount} = data;
    //TODO -> if user exists use that id in TournamentModel
    let userPromise, usersObjPromise;
    if (UserService.doesUserExist()) {
        //use user ID
    } else {
        //create new user (guest)
        userPromise = getSaveUserPromise({creatorName});
    }
    let userId, usersObjId;
    return getSaveUsersObjPromise({playerCount}).then(function (usersObj) {
        usersObjId = usersObj._id;
        return userPromise;
    }).then(function (user) {
        userId = user._id;
        return getSaveTournamentPromise({title: tourneyName, creatorId: userId, playersObjId: usersObjId})
    }).then(function (data) {
        console.log(data);
        return callback(null);
    }).catch(error => {
        console.log(error);
        return callback(Error("New tournament could not be saved:: " + error.message));
    });
}
exports.getTournaments = (callback) => {
    return getTournamentsPromise().then(function (tournaments) {
        let promises = [];

        tournaments.forEach((tournament) => {
            promises.push(getCreatorPromise(tournament.creatorId));
            promises.push(getUsersObjPromise(tournament.playersObjId));
        });
        return getOnePromiseForMany(promises, tournaments)
    }).then(function (data) {
        let results = data.res;
        let tournaments = data.original;
        let index = 0;
        let object = [];
        tournaments.forEach((tournament) => {
            object.push({tournament: tournament, usersObj: results[index+1], creatorObj: results[index] })
            index += 2;
        })
        console.log(object);
        callback(null, object);
    }).catch(error => {
        callback(Error("could not get tournaments:: "+ error.message));
    })
}

function getOnePromiseForMany(promises, originalObj){
    return new Promise(function (resolve, reject) {
        Promise.all(promises).then(function(response){
            resolve({res: response, original: originalObj});
        }).catch(error => {
            reject(error);
        });
    });
}

function getTournamentsPromise() {
    return new Promise(function (resolve, reject) {
        TournamentModel.find(function (error, results) {
            if (error) reject(error);
            resolve(results);
        });
    });
}

function getCreatorPromise(userId) {
    return new Promise(function (resolve, reject) {
        UserService.getUserFromId(userId, function (error, user) {
            if (error) reject(error);
            resolve(user);
        });
    });
}

function getUsersObjPromise(usersObjId) {
    return new Promise(function (resolve, reject) {
        UsersObjService.getUsersObjFromId(usersObjId, function (error, usersObj) {
            if (error) reject(error);
            resolve(usersObj);
        });
    });
}

function getSaveTournamentPromise(data) {
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

function getSaveUserPromise(data) {
    const {creatorName} = data;
    return new Promise(function (resolve, reject) {
        UserService.saveUser({creatorName}, function (err, user) {
            if (err) reject(err);
            else resolve(user);
        });
    });
}

function getSaveUsersObjPromise(data) {
    const {playerCount} = data;
    return new Promise(function (resolve, reject) {
        UsersObjService.saveUsersObj({playerCount}, function (err, usersObj) {
            if (err) reject(err);
            else resolve(usersObj);
        });
    })
}
