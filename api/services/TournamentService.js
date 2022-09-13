const UserService = require('../services/UserService');
const PromiseService = require('./PromiseService');
const HelperService = require("./HelperService");
const BracketTreeService = require("./BracketTreeService");

exports.saveTournament = (data, callback) => {
    //validate data
    console.log(data);
    let tournamentData = null;
    const {tourneyName, creatorName, playerCount, typeIndex} = data;
    //TODO -> if user exists use that id in TournamentModel
    let userPromise, bracketPromise;
    if (UserService.doesUserExist()) {
        //use user ID
    } else {
        //create new user (guest)
        userPromise = PromiseService.getSaveUserPromise({creatorName});
    }
    userPromise.then(function (user){
        return PromiseService.getSaveTournamentPromise({
            title: tourneyName,
            creatorId: user._id,
            playerCount: playerCount
        })
    }).then(function(tournament){
        tournamentData = tournament;
        return PromiseService.getSaveBracketPromise({
            tournamentId: tournament._id,
            typeIndex: typeIndex,
            //get player count dynamically
            playerSlots: tournament.playerCount
        })
    }).then(function (bracket){
        BracketTreeService.createBracket(bracket, function (err, bracketTree){
            if (err){
                callback(err);
                return;
            }
            //let arr = [];
           // console.log(bracketTree.getNodesInOrder(bracketTree.rootNode, arr))
        })
        callback(null, tournamentData);
    }).catch(err => {
        callback(err);
    })
}
exports.getTournaments = (callback) => {
    PromiseService.getTournamentsPromise().then(function (tournaments) {
        let promises = [];

        tournaments.forEach((tournament) => {
            promises.push(PromiseService.getCreatorPromise(tournament.creatorId));
            promises.push(PromiseService.getBracketsPromise(tournament._id));
        });
        return PromiseService.getOnePromiseForMany(promises, tournaments)
    }).then(function (data) {
        let results = data.res;
        let tournaments = data.original;
        let index = 0;
        let object = [];
        tournaments.forEach((tournament) => {
            object.push({tournament: tournament, bracket: results[index + 1], creatorObj: results[index]})
            index += 2;
        })
        callback(null, object);
    }).catch(error => {
        callback(Error("could not get tournaments:: " + error.message));
    })
}
exports.getOneTournament = (id, callback) => {
    PromiseService.getTournamentPromise(id).then(function (rawTourney) {
        let promises = [PromiseService.getCreatorPromise(rawTourney.creatorId), PromiseService.getBracketPromise(rawTourney.playersObjId)];
        return PromiseService.getOnePromiseForMany(promises, rawTourney);
    }).then(function (data) {
        callback(null, HelperService.combineObjects({tournament: data.original}, {creatorObj: data.res[0]}, {bracket: data.res[1]}));
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



