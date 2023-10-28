const { EmbedBuilder } = require("discord.js");
const config = require("../src/config.json")

module.exports.run = async ({ message }) => {
    try {
        const start = Date.now();

        message.reply("Pong!")
        .then(msg => {
            const ping = Date.now() - start;
            msg.edit(`${msg.content} - Response Time: \`${ping}ms\``)
        })
    } catch (err) {
        message.channel.send("Command \`'?pong'\` Failed!")
        console.log(err.message)
    }
}


module.exports.config = {
    name: "ping",
    description: "Test Response Time",
    usage: ""
}