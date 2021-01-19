import { ChatMessage } from 'mineflayer';
import { getChannel, Tracc } from '..';

export async function mfEvents(bot: Tracc) {
	const channel = getChannel(bot);

	bot.mf.on('spawn', () => {
		console.log(`Minecraft bot spawned as ${bot.mf.username}`);
		channel?.send(`Bot spawned as ${bot.mf.username}`);
	});

	bot.mf.on('end', () => {
		console.log('Disconnected from the server.');
		channel?.send('Disconnected from the server.');
	});

	bot.mf.on('kicked', (reason: any) => {
		reason = JSON.parse(reason);
		console.log(`I was kicked from the server! Reason: ${reason.text}`);
		channel?.send(`I was kicked from the server! Reason: ${reason.text}`);
	});

	bot.mf.on('message', (raw: ChatMessage) => {
		const msg: string = raw.toString();
		const rich: string = `\`${msg.trim()}\``;
		if (rich === '``') return;
		console.log(msg);
		channel?.send(
			rich.includes(bot.mf.username) &&
				process.env.PING_ON_MENTION === 'true'
				? `<@!${process.env.YOUR_ID}> ${rich}`
				: rich
		);
	});
}
