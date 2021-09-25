const { Intents } = require("discord.js");//intents
const dotenv = require("dotenv").config();//init .env
const ProtonClient = require("./classes/ProtonClient");
const Client = new ProtonClient({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]}); //Instansite client
Client.start(process.env.TOKEN);//Login
module.exports = Client;