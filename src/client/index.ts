import { createBot, Bot } from 'mineflayer';
import { CommandoClient } from 'discord.js-commando';
import { config } from 'dotenv';
import { join } from 'path';
import { TextChannel } from 'discord.js';
import { djsEvents } from './events/djs';

export type Tracc = { djs: CommandoClient; mf: Bot };

export function getChannel(bot) {
	return bot.djs.channels.cache.get(
		`${process.env.DISCORD_CHANNEL}`
	) as TextChannel;
}

export class TraccClient {
	bot: Tracc;

	constructor() {
		config({ path: join(__dirname, '../../.env') });

		this.bot = {
			djs: new CommandoClient({
				owner: process.env.YOUR_ID,
				commandPrefix: process.env.PREFIX || 't!',
			}),
			mf: createBot({
				host: process.env.SERVER,
				port: parseInt(process.env.PORT) || undefined,
				username: process.env.MINECRAFT_EMAIL,
				password: process.env.MINECRAFT_PASSWORD,
				version: process.env.VERSION || undefined,
			}),
		};

		this.handleDJS();
	}

	handleDJS() {
		djsEvents(this.bot);

		this.bot.djs.login(process.env.BOT_TOKEN);
	}
}
