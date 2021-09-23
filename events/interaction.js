module.exports = {
    name: "interactionCreate",
    async execute(interaction, client){
        if (!interaction.isCommand()) return;
        const cmd = client.commandsArray.find(command => command.name === interaction.commandName) || client.commandsArray.find(cmd => cmd.aliases && cmd.aliases.includes(interaction.commandName));
        return interaction.reply("Slash commands are not currently functional");
        try{ cmd.slash(interaction, client, api) }catch(error){
            client._throw(0, "There was an internal server error.", message, error)
        };
    }
}