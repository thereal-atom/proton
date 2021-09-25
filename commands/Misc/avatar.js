const { MessageEmbed, Constants } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Display a users avatar",
    aliases: ["av", "pfp"],
    usage: "avatar [@user]",
    run: (message, args, client) => {
        const user = args[0] ? (message.mentions.users.first() ? message.mentions.users.first() : message.guild.members.cache.find(member => member.id === args[0])) : message.author;
        if(!user) return client._throw(1, "No user could be found.", message)
        const embed = new MessageEmbed()
            .setImage(user.displayAvatarURL({dynamic: true, size: 256}))
            .setColor(client.constants.__colors.misc)
            .setFooter(`${user.tag}'s avatar`)
        message.channel.send({embeds: [embed]});
    },
    slash: {
        options: [{
            name: "user",
            description: "This users avatar",
            type: Constants.ApplicationCommandOptionTypes.MENTIONABLE
        }],
        run: (interaction, client) => {
            interaction.reply("Avatar:")
        }
    }
}