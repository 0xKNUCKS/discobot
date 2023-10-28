const { EmbedBuilder } = require("discord.js");
const config = require("../src/config.json")

module.exports.run = async ({ args, message, client }) => {
    try {
        const EmbMsg = new EmbedBuilder()
        if(!client.commands.has(args[0]))
        {
            EmbMsg
            .setColor(client.randomRGB())
            .setTitle("Commands Help")

            for (let [key, value] of client.commands.entries()) {
                EmbMsg.addFields([{
                    name: config.prefix + `${key} ${value.config.usage}`,
                    value: value.config.description
                }])
            }
        } else
        {
            const cmd = client.commands.get(args[0])
            EmbMsg
            .setColor(client.randomRGB())
            .setTitle(`Command: ${args[0]}`)
            EmbMsg.addFields([{
                name: config.prefix + `${cmd.config.name} ${cmd.config.usage}`,
                value: cmd.config.description
            }])
        }

        await message.reply({ embeds: [EmbMsg] });
    } catch (err) {
        message.channel.send("Command \`'?help'\` Failed!")
        console.log(err.message)
    }
}


module.exports.config = {
    name: "help",
    description: "Show Commands Help",
    usage: "[Command]"
}