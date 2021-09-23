const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "ban",
    description: "Ban a user from a server.",
    usage: "ban {user} [reason]",
    aliases: [],
    botPermissions: ["BAN_MEMBERS"],
    memberPermissions: ["BAN_MEMBERS"],
    run: async (message, args, client, api) => {
        const user = message.mentions.users.first() ? message.mentions.users.first() : await client.users.fetch(args[0]);
        const member = message.guild.members.resolve(user);
        const emojis = client.constants.__emojis;
        const bannedUsers = await message.guild.fetchBans();
        //Errors
        if(!user) return client._throw(1, "You did not mention a user to ban.", message);
        if(!member) return client._throw(1, "This user could not be found", message);
        if(user.id === message.author.id) return client._throw(1, "You can't ban yourself -_-", message);
        if(bannedUsers.find(member => member.id === user.id)) return client._throw(1, "This user is already banned.", message);
        //Embed
        const reason = args.filter(arg => arg !== `<@!${user.id}>` || arg !== user.id).join(" ");
        const embed = new MessageEmbed().setColor(client.constants.__colors.moderation)
        .setAuthor("Proton Moderation", client.user.displayAvatarURL())
        .setTitle(`${emojis.tick} ${user.tag} was banned by ${message.author.tag}`)
        .setThumbnail(user.displayAvatarURL())
        .setDescription(`${emojis.text} Reason: ***${reason?reason:"None provided"}***`)
        //Ban
        await api.moderation.createInfraction(user, message, reason, "ban").then(() => {
            member.ban({reason})
        }).then(() => {
            message.channel.send(embed);
        }).catch(error => {
            client._throw(1, "There was an error banning this user.", message, error);
        })
    },
};