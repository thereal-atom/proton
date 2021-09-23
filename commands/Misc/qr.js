module.exports = {
    name: "qr",
    description: "Generate a qr code for a link.",
    usage: "qr {link}",
    run: async(message, args, client, api) => {
        if(!args[0]) return client._throw(1, "You didnt proivide a link", message);
        const link = encodeURIComponent(args[0]);
        const data = await api.misc.genQrCode(link);
        console.log(data);
        return message.reply(data);
    }
}