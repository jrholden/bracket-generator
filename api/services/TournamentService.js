const UserService = require('../services/UserService');
const PromiseService = require('./PromiseService');
const HelperService = require("./HelperService");

exports.saveTournament = (data, callback) => {
    //validate data
    const {tourneyName, creatorName, playerCount} = data;
    //TODO -> if user exists use that id in TournamentModel
    let userPromise, usersObjPromise;
    if (UserService.doesUserExist()) {
        //use user ID
    } else {
        //create new user (guest)
        userPromise = PromiseService.getSaveUserPromise({creatorName});
    }
    let userId, usersObjId;
    PromiseService.getSaveUsersObjPromise({playerCount}).then(function (usersObj) {
        usersObjId = usersObj._id;
        return userPromise;
    }).then(function (user) {
        userId = user._id;
        return PromiseService.getSaveTournamentPromise({
            title: tourneyName,
            creatorId: userId,
            playersObjId: usersObjId
        })
    }).then(function (data) {
        return callback(null, data);
    }).catch(error => {
        return callback(Error("New tournament could not be saved:: " + error.message));
    });
}
exports.getTournaments = (callback) => {
    PromiseService.getTournamentsPromise().then(function (tournaments) {
        let promises = [];

        tournaments.forEach((tournament) => {
            promises.push(PromiseService.getCreatorPromise(tournament.creatorId));
            promises.push(PromiseService.getUsersObjPromise(tournament.playersObjId));
        });
        return PromiseService.getOnePromiseForMany(promises, tournaments)
    }).then(function (data) {
        let results = data.res;
        let tournaments = data.original;
        let index = 0;
        let object = [];
        tournaments.forEach((tournament) => {
            object.push({tournament: tournament, usersObj: results[index + 1], creatorObj: results[index]})
            index += 2;
        })
        callback(null, object);
    }).catch(error => {
        callback(Error("could not get tournaments:: " + error.message));
    })
}
exports.getOneTournament = (id, callback) => {
    PromiseService.getTournamentPromise(id).then(function (rawTourney) {
        let promises = [PromiseService.getCreatorPromise(rawTourney.creatorId), PromiseService.getUsersObjPromise(rawTourney.playersObjId)];
        return PromiseService.getOnePromiseForMany(promises, rawTourney);
    }).then(function (data) {
        callback(null, HelperService.combineObjects({tournament: data.original}, {creatorObj: data.res[0]}, {usersObj: data.res[1]}));
    }).catch(error => {
        callback(error);
    });
}
exports.deleteOneTournament = (id, callback) => {
    PromiseService.getDeleteOnePromise(id).then(function(deletedDoc){
        console.log("DELETED:: "+deletedDoc);
        callback(null, true);
    }).catch(error => {
        callback(error);
    })
}



