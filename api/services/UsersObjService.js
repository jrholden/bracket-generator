const UsersObjModel = require('../database/models/UsersObj');
const {Error} = require("mongoose");
const UserModel = require("../database/models/User");

exports.saveUsersObj = (data, callback) => {

    const {playerCount} = data;
    const usersObj = new UsersObjModel({
        playerCount: playerCount
    });
    usersObj.save(function (error, usersObj) {
        if (error) {
            console.log("USERSOBJ ERROR:: " + error);
            return callback(new Error("UserObj could not be saved:: " + error.message));
        }
        return callback(null, usersObj);
    });
}
exports.getUsersObjFromId = (usersObjId, callback) => {
    UsersObjModel.findById(usersObjId, function (error, usersObj) {
        if (error) return callback(new Error("Cannot find USERSOBJ from ID :: " + error.message));
        return callback(null, usersObj);
    });
}
exports.deleteManyUsersObjs = (filterObj,callback) => {
    UsersObjModel.deleteMany(filterObj, function(err, deletedCount){
        if (err) callback(err);
        else callback(null, deletedCount);
    })
}