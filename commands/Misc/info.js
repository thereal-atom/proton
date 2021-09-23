const { MessageEmbed } = require("discord.js");
const formatDuration = require('date-fns/formatDuration');  
const utils = require("../../utils/utils");

module.exports = {
    name: "info",
    description: "Info about proton.",
    run: (message, args, client) => {
        const { version, arch, platform, cpuUsage, resourceUsage, memoryUsage, env, uptime } = process;
        
        const embed = new MessageEmbed()
            .setAuthor("Proton", client.user.displayAvatarURL())
            .setColor("#00ffaa")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {name: "Creator", value: "Atom", inline: true},
                {name: "Library", value: "DiscordJS", inline: true},
                {name: "Creation", value: "June 15th 2021", inline: true},
                {name: "Bot Version", value: "Dev 0.1.0", inline: true},
                {name: "Website Version", value: "Dev 0.0.1", inline: true},
                {name: "Node Version", value: version, inline: true},
                {name: "Platform", value: platform, inline: true},
                {name: "Architechture", value: arch, inline: true},
            )
            .setFooter(`Uptime: ${utils.secondsToDhms(uptime())}`);
        message.channel.send({embeds: [embed]});
    }
}