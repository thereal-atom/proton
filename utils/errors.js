const Discord = require("discord.js");
const throwErr = (type, text, message, client, error) => {
    if(error) console.error(error);
    const embed = new Discord.MessageEmbed()
        .setColor(client.constants.__colors.error)
        .setTitle(`${client.constants.__emojis.cross} ${text}`)
    return message.channel.send(embed);
}
module.exports = { throwErr };