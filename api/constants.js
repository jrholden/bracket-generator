//TODO- Setup to pull from env
module.exports = Object.freeze({
    test: "test",
    mongo: {
        url: 'mongodb://127.0.0.1:27017/test_database',
        config: {useNewUrlParser: true, useUnifiedTopology: true}
    },
    paths: {
        models: {
            test: '../database/models/test'
        }
    },
    bracket:{
        tournamentTypes: [
            "Single Elimination"
        ]
    }
})