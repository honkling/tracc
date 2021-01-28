module.exports = (client) => {
    client.on('spawn', () => {
        console.log('[BOT] Minecraft bot spawned!');
    });

    client.on('kicked', (reason) => {
        console.log('[BOT] Minecraft bot kicked from server! Reason: ' + reason.toString());
        client.connectedToMCServer = false;
    });

    client.on('end', () => {
        console.log('[BOT] Minecraft bot disconnected from server!');
        client.connectedToMCServer = false;
    });

    client.on('message', (msg) => {
		if(msg.toString().trim() === '') return;
	    console.log(`[CHAT] ${msg.toString()}`);
    });
}
