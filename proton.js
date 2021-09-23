const { Intents } = require("discord.js");
const dotenv = require("dotenv").config();
const ProtonClient = require("./classes/ProtonClient");
const Client = new ProtonClient({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
Client.start(process.env.TOKEN);
module.exports = Client;