const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UsersObjSchema = new Schema({
    playerCount: {type: Number, required: true}
});

module.exports = mongoose.model('UsersObj', UsersObjSchema);