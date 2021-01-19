import { Message, User } from 'discord.js';
import { Command, CommandoClient } from 'discord.js-commando';
import { TagManager } from '../../managers/tag';

export class TagCommand extends Command {
	constructor(bot: CommandoClient) {
		super(bot, {
			name: 'tag',
			group: 'tracc',
			memberName: 'tag',
			description: 'Manage tags and tag managers with ease.',
			args: [
				{
					key: 'option',
					type: 'string',
					prompt:
						'What do you want to do? (managers, set, delete, source)',
					oneOf: ['managers', 'set', 'delete', 'source'],
				},
				{
					key: 'option2',
					type: 'string',
					prompt:
						'What do you want to do? (managers = (add, remove, list), <tag name>)',
				},
				{
					key: 'option3',
					type: 'member|string',
					prompt:
						'What do you want to do? (managers = (<member name/id/mention>), [tag content])',
					default: null,
				},
			],
		});
	}

	exec(
		msg: Message,
		{
			option,
			option2,
			option3,
		}: { option: string; option2: string; option3: string | User }
	) {
		switch (option) {
			case 'managers':
				switch (option2) {
					case 'add':
						if (option3 === null || typeof option3 === 'string')
							return msg.channel.send(
								'You must provide a member!'
							);
						if (TagManager.getManagers().includes(option3.id))
							return msg.channel.send(
								'That user is already a manager!'
							);
						TagManager.addManager(option3);
						msg.channel.send(`${option3.tag} is now a manager!`);
						break;
					case 'remove':
						if (option3 === null || typeof option3 === 'string')
							return msg.channel.send(
								'You must provide a member!'
							);
						if (!TagManager.getManagers().includes(option3.id))
							return msg.channel.send(
								"That user isn't a manager!"
							);
						TagManager.removeManager(option3);
						msg.channel.send(
							`${option3.tag} is no longer a manager!`
						);
						break;
					case 'list':
						const list = TagManager.getManagers();
						if (list === [])
							return msg.channel.send(
								'There are no tag managers currently.'
							);
						const mapped = list
							.map(i => {
								const user = msg.guild.members.cache.get(i);
								if (!user) return '- (unknown)';
								return `- ${user.user.tag}`;
							})
							.join('\n');
						msg.channel.send(
							`Showing ${list.length} managers:\n${mapped}`
						);
						break;
				}
				break;
			case 'set':
				if (typeof option3 !== 'string')
					return msg.channel.send(
						'You must provide content for the tag!'
					);
				TagManager.createTag(option2, option3);
				msg.channel.send(`Tag \`${option2}\` created.`);
				break;
			case 'delete':
				TagManager.removeTag(option2);
				msg.channel.send(`Tag \`${option2}\` deleted.`);
				break;
		}
	}
}
