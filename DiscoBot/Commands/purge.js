module.exports.run = async ({ args, message }) => {
    try {
        if (isNaN(parseFloat(args[0])))
        {
            message.reply("Invalid Arguments!")
            return;
        }
        message.delete()
        await message.channel.bulkDelete(args[0])
        .then(() => message.channel.send(`${args[0]} Messages Deleted!`)
        .then(msg => setTimeout(msg.delete, 3000)))
        .catch(() => {message.channel.send("Unkown Error!")})
    } catch (err) {
        message.channel.send("Command \`'?purge'\` Failed!")
        console.log(err.message)
    }
}

module.exports.config = {
    name: "purge",
    description: "Purge a Specific Amount of Messages in a Specific Channel",
    usage: "[amount/user/id]"
}