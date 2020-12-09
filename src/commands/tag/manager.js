const { Command } = require('discord.js-commando');
const path = require('path');
const fs = require('fs');
const tags = require(path.join(__dirname + '../../../tags.json'));

module.exports = class ManagerCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'manager',
            aliases: ['managers'],
            group: 'tag',
            memberName: 'manager',
            description: 'Manage managers for your bot.',
            args: [
                {
                    key: 'option',
                    prompt: 'What do you want to do?',
                    type: 'string',
                    oneOf: ['grant', 'revoke']
                },
                {
                    key: 'user',
                    prompt: 'Who do you want to grant/remove access from?',
                    type: 'member'
                }
            ]
        });
    }
    
    run(message, { option, user }) {
		if(!this.client.isOwner(message.author)) return;
        if(option === 'grant') {
            if(tags.managers.includes(user.id)) return message.say('That user is already a manager!');
            tags.managers.push(user.id);
			fs.writeFileSync(path.join(__dirname, '../../tags.json'), JSON.stringify(tags));
            return message.say('Granted ' + user.user.tag + ' tag access!');
        } else {
			if(!tags.managers.includes(user.id)) return message.say('That user isn\'t a manager!');
            tags.managers.splice(tags.managers.indexOf(user.id), 1);
            fs.writeFileSync(path.join(__dirname, '../../tags.json'), JSON.stringify(tags));
            return message.say('Revoked ' + user.user.tag + ' tag access!');
        }
    }
}