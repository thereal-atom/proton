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
        
        this.constants = constants;
        this.commandsArray = [];

        this.LoadEvents();
        this.ConnectToMongoDb();
    }
    //Connect to database
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
    //Load standard commands
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
    //Load events
    LoadEvents(){
        eventFiles.forEach(file => {
            const event = require(`../events/${file}`);
            if (event.once) {this.once(event.name, (...args) => event.execute(...args, this));
            } else {this.on(event.name, (...args) => event.execute(...args, this));}
        });
    };
    //Loading slash commands
    LoadSlashCommands(){
        const guild = this.guilds.cache.get("787410312499953685");
        let commands;
        if(guild){
            commands = guild.commands
        }else{
            commands = this.application?.commands
        }
        this.commands=commands;
    }
    //Sending errors
    _throw(type, text, message, error){
        errors.throwErr(type, text, message, this, error);
    };
    //Start bot
    start(token){
        this.login(token);
    };
}
module.exports = ProtonClient;