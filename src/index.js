const { CommandoClient } = require('discord.js-commando');
const ClientManager = require('./ClientManager');
const fs = require('fs');
const path = require('path');
const tags = require('./tags.json');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const bot = new CommandoClient({
    owner: process.env.YOUR_ID,
    commandPrefix: process.env.PREFIX,
});
let client = new ClientManager({
    host: process.env.SERVER,
    username: process.env.MINECRAFT_EMAIL,
    password: process.env.MINECRAFT_PASS,
    bot: bot
});
bot.client = client;


bot.once('ready', () => {
    console.log('Discord bot ready!');
    if(!tags.managers.includes(process.env.YOUR_ID)) {
        tags.managers.push(process.env.YOUR_ID);
        fs.writeFileSync('./tags.json', JSON.stringify(tags));
    }
});

bot.on('message', (msg) => {
    if(msg.author.bot) return;
    if(msg.channel.id !== process.env.DISCORD_CHANNEL) return;
    if(msg.content.startsWith(process.env.PREFIX)) {
        const tag = tags.list.filter(x => x === msg.content.split(' ')[0].substr(process.env.PREFIX.length));
        if(tag === []) return client.chat(msg.content);
        else if(typeof tags.tags[tag[0]] === 'string') return client.chat(tags.tags[tag[0]]);
    }
    client.chat(msg.content);
});

bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['tag', 'Tags'],
        ['mc', 'Minecraft'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        unknownCommand: false,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(process.env.BOT_TOKEN);
