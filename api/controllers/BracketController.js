const BracketService = require('../services/BracketService');

exports.createBracket = (req,res) => {
    try {
        console.log(req.body);
        let props = req.body;
        BracketService.createBracket(props, function (err,data){
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
exports.getBrackets = (req,res) => {
    try {
        BracketService.getBrackets();
    }catch (err) {
        res.status(400).json({
            res: false,
            err
        });
    }
}