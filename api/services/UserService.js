const UserModel = require('../database/models/User');
const TournamentModel = require("../database/models/Tournament");
const PromiseService = require("./PromiseService");

exports.saveUser = (data, callback) => {
    //console.log(data);
    const name = data.creatorName;
    const user = new UserModel({
        name: name
    });
    user.save(function (error, user) {
        if (error) {
            console.log("UserSaveError:: " + error);
            return callback(new Error("User could not be saved:: " + error.message));
        }
        return callback(null, user);
    });
}
//TODO
exports.doesUserExist = () => {
    return false;
}
exports.getUser = (id, callback) => {
    PromiseService.getUserPromise(id).then(function(user){
        callback(null, user);
    }).catch(err => {
        callback(err);
    })
}
//remove
exports.getUserFromId = (userId, callback) => {
    UserModel.findById(userId, function (error, user) {
        if (error) {
            console.log(error);
            return callback(new Error("Could Not Find User:: " + error.message));
        }
        return callback(null, user);
    });
}
exports.deleteManyUsers = (filterObj,callback) => {
    UserModel.deleteMany(filterObj, function(err, deletedCount){
        if (err) callback(err);
        else callback(null, deletedCount);
    })
}