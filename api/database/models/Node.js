const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NodeSchema = new Schema({
    bracketId: {type: Schema.Types.ObjectId, required: true},
    depth: {type: Number, required: true},
    rank: {type: Number, required: true},
    isNull: {type: Boolean, required: true},
    isChildrenSet: {type: Number, required: true},
    playerId: {type: Schema.Types.ObjectId, required: false},
});

module.exports = mongoose.model('Node', NodeSchema);