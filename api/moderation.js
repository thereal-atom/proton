const infractionSchema = require("../models/infractionSchema");
const createInfraction = async (user, message, reason, type) => {
    const result = await infractionSchema.findOne({guildId: message.guild.id});
    const infractionObj = {
        userId: user.id,
        username: user.tag,
        reason,
        guildId: message.guild.id,
        moderatorId: message.author.id,
        type,
        case: result?result.case+1:1 }
    await new infractionSchema(infractionObj).save();
};
module.exports = { createInfraction };