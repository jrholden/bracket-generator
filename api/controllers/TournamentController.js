const constants = require('../constants');
const Test = require(constants.paths.models.test);
const TournamentService = require('../services/TournamentService');

exports.saveTournament = (req, res) => {
    try {
        TournamentService.saveTournament(req.body, function (error, data) {
            if (error) {
                return res.status(422).json({
                    res: false,
                    error
                })
            }

            res.status(200).json({
                res: data
            });
        })
    } catch (err) {
        res.status(400).json({
            res: false,
            err
        });
    }

};
exports.getTournaments = (req, res) => {
    try {
        TournamentService.getTournaments(function (error, tournaments) {
            if (error) {
                return res.status(422).json({
                    res: false,
                    error
                })
            }
            if(tournaments.length < 1) {
                tournaments=false;
            }
            res.status(200).json({
                res: tournaments
            });
        });
    } catch (err) {
        res.status(400).json({
            res: false,
            err
        });
    }

};
exports.getOneTournament = (req, res) => {
    try {
        let id = req.params.id;
        TournamentService.getOneTournament(id, function (error, tournament) {
            if (error) {
                return res.status(422).json({
                    res: false,
                    error
                })
            }
            res.status(200).json({
                res: tournament
            });
        })
    } catch (err) {
        res.status(400).json({
            res: false,
            err
        });
    }

};
//DOES NOT DELETE creatorOBJ or BRACKET
exports.deleteTournament = (req,res) => {
    try{
        let id = req.params.id;
        TournamentService.deleteOneTournament(id, function (error, success) {
            if (error) {
                return res.status(422).json({
                    res: false,
                    error
                })
            }
            res.status(200).json({
                res: success
            });
        })
    }catch (err) {
        res.status(400).json({
            res: false,
            err
        });
    }
}