module.exports = (client, bot) => {
    client.on('spawn', () => {
        console.log('Minecraft bot spawned!');
    });

    client.on('kicked', (reason) => {
        console.log('Minecraft bot kicked from server! Reason: ' + reason);
        client.connectedToMCServer = false;
    });

    client.on('end', () => {
        console.log('Minecraft bot disconnected from server!');
        client.connectedToMCServer = false;
    });

    client.on('message', (msg) => {
	    console.log(msg.toString());
	    let message = '`' + msg.toString().replace(/(\`)/g, '').trim() + '`';
	    if(message === '``') return;
	    bot.channels.cache.get(process.env.DISCORD_CHANNEL).send(process.env.PING_ON_MENTION && (message.includes(client.username) || message.startsWith('From ')) ? `${message} <@${process.env.YOUR_ID}>` : `${message}`);
    });
}
