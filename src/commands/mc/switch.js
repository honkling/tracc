const { Command } = require('discord.js-commando');
const path = require('path');
const ClientManager = require(path.join(__dirname, '../../ClientManager'));

module.exports = class SwitchCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'switch',
            group: 'mc',
            memberName: 'switch',
            description: 'Switch to a server.',
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
        this.client.client = new ClientManager({
            host: server,
            username: process.env.MINECRAFT_EMAIL,
			password: process.env.MINECRAFT_PASS,
			bot: this.client
		});
        return message.say('Joined `' + server + '`!');
    }
}