const { Permissions } = require("discord.js");
const api = require("../api/index");
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
module.exports = {
    name: "messageCreate",
    async execute(message, client){
        if(!message.guild || message.author.bot)return;
        const prefix = client.constants.__objects.setupObj.prefix;
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        if(message.content === 'prefix') return message.channel.send(`The prefix in this guild (${message.guild.name}) is \`${prefix}\``);
        const matchedPrefix = message.content.match(prefixRegex);
        if(!matchedPrefix) return;
        const args = message.content.slice(matchedPrefix[0].length).trim().split(/ +/);
        if (!prefixRegex.test(message.content)) return;
        const commandName = args.shift().toLowerCase();
        const cmd = client.commandsArray.find(command => command.name === commandName)|| client.commandsArray.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!cmd) return;
        const botPerms = cmd.botPermissions ? cmd.botPermissions.map(permission => Permissions.FLAGS[permission]) : [Permissions.FLAGS["SEND_MESSAGES"]];
        const memberPerms = cmd.memberPermissions ? cmd.memberPermissions.map(permission => Permissions.FLAGS[permission]) : [Permissions.FLAGS["SEND_MESSAGES"]];
        if(!message.member.permissions.has(botPerms)) return client._throw(1, `You are missing or or more permissions: \n\`${cmd.botPermissions.join(", ")}\``, message);
        if(!message.guild.me.permissions.has(memberPerms)) return client._throw(1, `The bot is missing one or more permissions: \n\`${cmd.memberPermissions.join(", ")}\``, message);
        try{ cmd.run(message, args, client, api) }catch(error){
            client._throw(0, "There was an internal server error.", message, error)
        };
    },
};