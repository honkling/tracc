const { Command } = require('discord.js-commando');
const path = require('path');
const fs = require('fs');
const tags = require(path.join(__dirname, '../../tags.json'));

module.exports = class TagCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'tag',
            group: 'tag',
            memberName: 'tag',
			description: 'Manage tags with ease',
            args: [
                {
                    key: 'option',
                    prompt: 'What do you want to do with the the tags?',
                    type: 'string'
                },
                {
                    key: 'name',
                    prompt: 'What tag do you want to modify/view?',
                    type: 'string'
                },
                {
                    key: 'content',
                    prompt: 'What do you want to set the tag\'s content to?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    run(message, { option, name, content }) {
		if(!tags.managers.includes(message.author.id) && !this.client.isOwner(message.author)) return;
        switch (option) {
            case 'set':
                if(content === '') return message.say('You must provide content for the tag!');
                if(!tags.list.includes(name)) tags.list.push(name);
                tags.tags[name] = content;
                fs.writeFileSync(path.join(__dirname, '../../tags.json'), JSON.stringify(tags));
                message.say('Set content of `' + name + '`!');
                break;
            case 'delete':
                if(!tags.list.includes(name)) return message.say('That tag doesn\'t exist!');
                delete tags.tags[name];
                tags.list.splice(tags.list.indexOf(name), 1);
                fs.writeFileSync(path.join(__dirname, '../../tags.json'), JSON.stringify(tags));
                message.say('Deleted tag `' + name + '`');
                break;
            case 'source':
                if(!tags.list.includes(name)) return message.say('That tag doesn\'t exist!');
                message.say('```\n' + tags.tags[name] + '\n```');
				break;
			default:
				return message.say('Invalid subcommand! `' + option + '`');
        }
    }
}