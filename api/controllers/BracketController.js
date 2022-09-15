const BracketTreeService = require('../services/BracketTreeService');
const BracketService = require('../services/BracketService')
exports.createBracket = (req,res) => {
    try {
        console.log(req.body);
        let props = req.body;
        BracketTreeService.createBracket(props, function (err,data){
            if (err) {
                console.log("CreateBracketError:: " + err);
                res.status(400).json({
                    res: false,
                    err
                });
            }
            res.status(200).json({
                res: data
            });
        });
    }catch (err) {
        console.log(err);
        res.status(400).json({
            res: false,
            err
        });
    }
}
exports.getBracket = (req,res) => {

}
exports.getBracketsById = (req,res) => {
    try {
        let props = req.params.id;
        BracketService.getBracketsForTournament (props, function (err,data){
            if (err) {
                console.log("GetBracketsIDError:: " + err);
                res.status(400).json({
                    res: false,
                    err
                });
            }
            res.status(200).json({
                res: data
            });
        });
    }catch (err) {
        console.log(err);
        res.status(400).json({
            res: false,
            err
        });
    }
}
exports.getBrackets = (req,res) => {
    try {
        BracketTreeService.getBrackets();
    }catch (err) {
        res.status(400).json({
            res: false,
            err
        });
    }
}