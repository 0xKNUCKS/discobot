try {
const config = require("./config.json")
const fs = require("fs") // file system
const chalk = require("chalk")
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField } = require("discord.js");
const { REPLServer, REPL_MODE_SLOPPY } = require("repl");
const { channel } = require("diagnostics_channel");

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
] });

client.randomRGB = () => {return "#"+Math.floor(Math.random()*16777215).toString(16);}

client.commands = new Map();
const commandsFolder = fs.readdirSync("./Commands")

for (const commandFile of commandsFolder)
{
    const commandsModule = require(`../Commands/${commandFile}`)

    const commandName = commandsModule.config.name;

    client.commands.set(commandName, commandsModule)
    console.log(chalk.magentaBright(`Registered Command ${commandName}`))
}

client.on('ready', () => {
    console.log(chalk.greenBright(`(${client.user.tag}) is online. With ${client.guilds.cache.size} guilds and ${client.users.cache.size} users.`))
})
  
client.on('messageCreate', async message => {
    if (message.author.bot || message.channel.type == 'dm') return;
    
    const prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if (!command) return;

    if(!client.commands.has(command)){
        return message.reply(`Unknown command \`${command}\`!`)
    }

    const cmd = client.commands.get(command)

    cmd.run({message, args, client})
})

client.login(config.token)
} catch (err) {
    console.log(err.message)
}