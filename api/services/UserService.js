
const UserModel =  require('../database/models/User');

exports.saveUser = (data, callback) => {
    console.log(data);
    const name = data.creatorName;
    const user = new UserModel({
        name: name
    });
    user.save(function (error, user){
        if (error) {
            console.log(error);
            return callback( Error ("User could not be saved:: " + error.message) );
        }
        return callback ( null, user );
    });
}
//TODO
exports.doesUserExist = () => {
    return false;
}
exports.getUserFromId = (userId, callback) => {
    UserModel.findById(userId, function (error, user){
        if(error) {
            console.log(error);
            return callback ( Error ("Could Not Find User:: " + error.message) );
        }
        return callback (null, user);
    });
}