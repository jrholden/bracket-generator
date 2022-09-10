const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BracketSchema = new Schema({
    tournamentId: {type: Schema.Types.ObjectId, required: true},
    typeIndex: {type: Number, required: true},
    playerSlots: {type: Number, required: true}
});

module.exports = mongoose.model('Bracket', BracketSchema);