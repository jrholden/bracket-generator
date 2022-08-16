const constants = require('../constants');
const Test = require(constants.paths.models.test);
const players = require("../database/test-db");

function createTest(){
    return new Test({name: 'test'})
}

exports.test_function = (req, res) => {
    //res.send('This is a test function');
    const testInstance = createTest();
    testInstance.save((err) => {
        if (err) console.log("ERROR:: " + err );
        console.log("SAVED");
    });
    try {
        res.status(200).json({
            data: players
        });
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
};