const PromiseService = require("./PromiseService");


exports.authAdmin = (token, callback) => {
    console.log(token);
    callback(null, token.secret === '12345');
}
exports.deleteAllData = (callback) => {
    let promises = [];
    let filterObj = {};
    promises.push(PromiseService.getDeleteManyTourneysPromise(filterObj));
    promises.push(PromiseService.getDeleteManyUsersPromise(filterObj));
    promises.push(PromiseService.getDeleteManyUsersObjPromise(filterObj));

    PromiseService.getOnePromiseForMany(promises, {}).then(function (data) {
        let deletedCounts = {
            tourneys: data.res[0],
            users: data.res[1],
            usersObj: data.res[2]
        };

        callback(null, deletedCounts);
    }).catch(err => {
        callback(err);
    })
}
exports.deleteAllTourneys = (callback) => {
    PromiseService.getDeleteManyTourneysPromise({}).then(function (deletedCount) {
        callback(null, deletedCount);
    }).catch(err => {
        callback(err);
    })
}