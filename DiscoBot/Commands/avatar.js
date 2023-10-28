const { EmbedBuilder } = require("discord.js");

module.exports.run = async ({ args, message, client }) => {
    try {
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const EmbMsg = new EmbedBuilder()
            .setColor(client.randomRGB())
            .setAuthor({ name: `${User.user.tag}`, iconURL: User.displayAvatarURL() })
            .setTitle('Avatar Link')
            .setURL(User.avatarURL())
            .setImage(User.displayAvatarURL({size: 256}) )
            .setFooter({ text: `Requested By @${message.author.tag}`, iconURL: message.author.avatarURL() });
        
        await message.reply({ embeds: [EmbMsg] });
    } catch (err) {
        message.channel.send("Command \`'?avatar'\` Failed!")
        console.log(err)
    }
}

module.exports.config = {
    name: "avatar",
    description: "Show User's Avatar/PFP",
    usage: "[user/id]"
}