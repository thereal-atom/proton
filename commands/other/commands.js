const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "commands",
    aliases: ["cmds"],
    description: "List all of protons commands",
    usage: "commands",
    run: (message, args, client) => {
        const commandsArray = client.commands.map(command => `\`${command.name}\``);
        const embed = new MessageEmbed()
            .setAuthor("Proton", client.user.displayAvatarURL())
            .setTitle("Proton Commands")
            .setDescription(commandsArray.join(", "))
        message.channel.send(embed);
    }
}