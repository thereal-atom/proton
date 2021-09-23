const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "quote",
    usage: "quote",
    description: "Send a random quote.",
    run: async(message, args, client, api) => {
        const data = await api.fun.getQuote();
        const embed = new MessageEmbed()
            .setColor(client.constants.__colors.fun)
            .setAuthor(data.author)
            .setDescription(data.content)
        message.channel.send({embeds: [embed]})
    }
}