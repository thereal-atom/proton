const  { Client, Collection } = require("discord.js");
const fs = require('fs');
const mongoose = require("mongoose");

const constants = require("../utils/constants.json");
const errors = require("../utils/errors");
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./commands');

class ProtonClient extends Client {
    constructor(props){
        super(props);
        // this.commands = new Collection();

        this.constants = constants;
        this.commandsArray = [];
        this.successful = { "evts": [], "cmds": [], "modules": [] };

        this.LoadEvents();
        this.ConnectToMongoDb();
    }
    async ConnectToMongoDb(){
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(async mongoose => {
            console.log("Database connection established.");
        }).catch(error=> {
            console.error(error);
            return mongoose.connection.close
        });
        mongoose.Promise = global.Promise;
        return mongoose 
    };
    LoadCommands() {
        commandFolders.forEach(folder => {
            const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
            commandFiles.forEach(file => {
                const command = require(`../commands/${folder}/${file}`);
                this.commandsArray.push(command);
                this.commands?.create({
                    name: command.name,
                    description: command.description,
                    options: command.slash ? command.slash.options : [],
                })
            })
        });
    };
    LoadEvents(){
        eventFiles.forEach(file => {
            const event = require(`../events/${file}`);
            if (event.once) {this.once(event.name, (...args) => event.execute(...args, this));
            } else {this.on(event.name, (...args) => event.execute(...args, this));}
        });
    };
    LoadSlashCommands(){
        const guild = this.guilds.cache.get("787410312499953685");
        let commands;
        if(guild){
            commands = guild.commands
        }else{
            commands = this.application?.commands
        }
        this.commands=commands;
        // commands?.create({
        //     name: "ping",
        //     description: "Reply with pong"
        // })
    }
    _throw(type, text, message, error){
        errors.throwErr(type, text, message, this, error);
    };
    start(token){
        this.login(token);
    };
}
module.exports = ProtonClient;