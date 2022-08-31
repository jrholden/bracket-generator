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
    promises.push(PromiseService.getDeleteManyBracketPromise(filterObj));

    PromiseService.getOnePromiseForMany(promises, {}).then(function (data) {
        let deletedCounts = {
            tourneys: data.res[0].deletedCount,
            users: data.res[1].deletedCount,
            bracket: data.res[2].deletedCount
        };

        callback(null, deletedCounts);
    }).catch(err => {
        callback(err);
    })
}
exports.deleteAllTourneys = (callback) => {
    PromiseService.getDeleteManyTourneysPromise({}).then(function (deletedCount) {
        callback(null, deletedCount.deletedCount);
    }).catch(err => {
        callback(err);
    })
}