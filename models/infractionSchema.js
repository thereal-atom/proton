const mongoose = require('mongoose');
const infractionsSchema = mongoose.Schema({
    userId: String,
    username: String,
    reason: String,
    guildId: String,
    moderatorId: String,
    type: String,
    case: Number
})
module.exports = mongoose.model('infractions', infractionsSchema)