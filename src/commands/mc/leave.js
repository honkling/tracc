const { Command } = require('discord.js-commando');
const path = require('path');

module.exports = class LeaveCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'leave',
            group: 'mc',
            memberName: 'leave',
            description: 'Leave the current server.'
        });
    }

    run(message) {
		if(!this.client.client.connectedToMCServer) return message.say('Bot isn\'t connected to a server!');
        this.client.client.quit();
        this.client.client.connectedToMCServer = false;
        return message.say('Left the server!');
    }
}