module.exports = {
    name: "nasa",
    description: "Send a random photo from NASA's database",
    usage: "nasa",
    run: async(message, args, client, api) => {
        const imgUrl = await api.science.getNasa();
    }
}