const { Command } = require('discord.js-commando');
const path = require('path');
const ClientManager = require(path.join(__dirname, '../../ClientManager'));

module.exports = class JoinCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'join',
            group: 'mc',
            memberName: 'join',
            description: 'Join a server.',
            args: [
                {
                    key: 'server',
                    prompt: 'What server do you want to join?',
                    type: 'string'
                }
            ]
        });
    }

    run(message, { server }) {
        if(this.client.client.connectedToMCServer) return message.say('Bot is already connected to a server!');
        this.client.client = new ClientManager({
            host: server,
            username: process.env.MINECRAFT_EMAIL,
			password: process.env.MINECRAFT_PASS,
			bot: this.client
		});
        return message.say('Joined `' + server + '`!');
    }
}