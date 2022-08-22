const UsersObjModel = require('../database/models/UsersObj');
const {Error} = require("mongoose");

exports.saveUsersObj = (data, callback) => {
    //console.log(data);
    const { playerCount } = data;
    const usersObj = new UsersObjModel({
        playerCount: playerCount
    });
    usersObj.save(function (error, usersObj){
        if (error) {
            console.log(error);
            return callback( Error ("UserObj could not be saved:: " + error.message) );
        }
        //console.log(usersObj);
        return callback ( null, usersObj );
    });
}
exports.getUsersObjFromId = (usersObjId, callback) => {
    UsersObjModel.findById(usersObjId, function(error, usersObj){
       if (error) return callback(Error("Cannot find USERSOBJ from ID :: "+ error.message));
       return callback(null, usersObj);
    });
}