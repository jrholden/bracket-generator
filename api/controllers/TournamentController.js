const constants = require('../constants');
const Test = require(constants.paths.models.test);
const TournamentService = require('../services/TournamentService');

exports.saveTournament = (req, res) => {
    try {
        TournamentService.saveTournament(req.body, function(error, data){
            if( error ){
                return res.status(422).json({
                    res: false,
                    error
                })
            }
            res.status(200).json({
                res: data
            });
        }).then(function(){

        });
    } catch (err) {
        res.status(400).json({
            res: false,
            err
        });
    }

};
exports.getTournaments = (req, res) => {
    try {
        TournamentService.getTournaments(function(error, tournaments){
            if(error){
                return res.status(422).json({
                    res: false,
                    error
                })
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

}