const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BracketSchema = new Schema({
    playerCount: {type: Number, required: true}
});

module.exports = mongoose.model('Bracket', BracketSchema);