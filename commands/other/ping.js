module.exports = {
    name: "ping",
    description: "Replies with pong",
    run: (message) => {
        message.channel.send("Ping");
    },
    slash: {
        options: [],
        run: async (interaction) => {
            interaction.reply("pong");
        }
    }
}