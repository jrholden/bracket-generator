const AdminService = require('../services/AdminService');

exports.authAdmin = (req, res) => {
    try {
        AdminService.authAdmin(req.body, function (err, isAuthed) {
            if (err) {
                console.log("AdminAuthError:: " + err);
                res.status(400).json({
                    res: false,
                    err
                });
            }
            res.status(200).json({
                res: isAuthed
            });
        });
    } catch (err) {
        res.status(400).json({
            res: false,
            err
        });
    }
}
exports.deleteAllTourneys = (req, res) => {
    try {
        AdminService.deleteAllTourneys(function (err, deletedCount) {
            if (err) {
                console.log("TourneyDeleteERROR: " + err);
                res.status(400).json({
                    res: false,
                    err
                });
            }
            console.log(deletedCount);
            res.status(200).json({
                res: deletedCount
            });
        });
    } catch (err) {
        res.status(400).json({
            res: false,
            err
        });
    }
}
exports.deleteAllData = (req, res) => {
    try {
        AdminService.deleteAllData(function (err, deletedCount) {
            if (err) {
                console.log("AllDataDELETE ERROR: " + err);
                res.status(400).json({
                    res: false,
                    err
                });
            }
            console.log(deletedCount);
            res.status(200).json({
                res: deletedCount
            });
        });
    } catch (err) {
        res.status(400).json({
            res: false,
            err
        });
    }
}
exports.reject = (req, res) => {
    try {
        res.status(200).json({
            res: "You are not allowed!"
        });
    } catch (err) {
        res.status(400).json({
            res: false,
            err
        });
    }
}