const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const tags = require(path.join(__dirname + '../../../tags.json'));

module.exports = class TagsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'tags',
            aliases: ['list'],
            group: 'tag',
            memberName: 'tags',
            description: 'Shows a list of all tags'
        });
    }

    run(message) {
        const embed = new MessageEmbed()
            .setTitle(`Showing ${tags.list.length} tags`)
            .setDescription(`\`${tags.list.join('\`, \`')}\``)
            .setColor('55FF55')
            .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL());
        return message.say(embed);
    }
}