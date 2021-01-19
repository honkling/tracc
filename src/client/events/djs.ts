import { Command } from 'discord.js-commando';
import { Message } from 'discord.js';
import { TagManager } from '../managers/tag';
import { Tracc } from '..';
import { mfEvents } from './mf';

const { getTag, getTagList } = TagManager;

export function djsEvents(bot: Tracc) {
	bot.djs.once('ready', async () => {
		console.log(`Discord bot ready as ${bot.djs.user.tag}`);
		mfEvents(bot);
	});

	bot.djs.on('message', async (msg: Message) => {
		if (
			msg.author.bot ||
			msg.author.id !== process.env.YOUR_ID ||
			msg.channel.id !== process.env.DISCORD_CHANNEL
		)
			return;
		if (msg.content.startsWith(bot.djs.commandPrefix)) {
			const base = msg.content.substr(bot.djs.commandPrefix.length);
			if (bot.djs.registry.commands.get(base)) return;
			let exists: boolean = false;
			bot.djs.registry.commands.forEach((x: Command) => {
				if (x.aliases.includes(base)) exists = true;
			});
			if (exists) return;
			if (getTagList().includes(base)) return bot.mf.chat(getTag(base));
		}
		bot.mf.chat(msg.content);
	});
}
