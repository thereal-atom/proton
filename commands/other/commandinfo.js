const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "commandinfo",
    description: "Give info about a command.",
    usage: "commandinfo {command name}",
    aliases: ["cinfo", "command"],
    run: (message, args, client) => {
        //Errors
        if(!args[0]) return client._throw(1, "You didnt state a command.", message);
        if(!client.commandsArray.find(command => command.name === args[0])) return client._throw(1, "Command could not be found.", message);
        //Embed
        const command = client.commandsArray.find(command => command.name === args[0]);
        const embed = new MessageEmbed()
            .setTitle(command.name)
            .setDescription(command.description)
            .addFields(
                {name: "Usage", value: command.usage},
                {name: "Aliases", value: command.aliases.join(", ")},
            )
        message.channel.send({embeds: [embed]});
    }
}