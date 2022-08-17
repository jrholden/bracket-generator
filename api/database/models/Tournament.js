const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TournamentSchema = new Schema({
    title: {type: String, required: true},
    //desc: {type: String, required: false},
    creatorId: {type: Schema.Types.ObjectId, required: true },
    playersObjId: {type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Tournament', TournamentSchema);