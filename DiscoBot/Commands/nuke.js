const { PermissionsBitField } = require("discord.js");

module.exports.run = async ({ args, message }) => {
    let Channel;
    try {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            message.reply("\`Administrator\` Permissions is required for this Command!")
            return
        } else {
        Channel = message.mentions.channels.first() || await message.guild.channels.fetch(args[0] || message.channel.id)
        let newChannel = await Channel.clone()
        if (newChannel != Channel)
            message.delete()
        await Channel.delete()
        newChannel.send("Old Channel Nuked!");
    }
    } catch (err) {
        Channel.delete()
        content.log(`error: ${err.message}`)
    }
}

module.exports.config = {
    name: "nuke",
    description: "Nuke a Specific Channel",
    usage: "[channel/channel id]",
    category: "Moderation or something"
}