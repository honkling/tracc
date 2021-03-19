# tracc

**tracc** is a bot that links Minecraft and Discord chat. The bot joins the specified server with an account, and sends all messages in Minecraft chat to Discord, and all Discord messages to Minecraft. The bot also includes tags, and more features will be coming.

## Content

- [Configuration](https://github.com/honkling/tracc#configuration)
- [Usage](https://github.com/honkling/tracc#usage)
- [How to Contribute](https://github.com/honkling/tracc#contribution)

## Configuration

When configuring the bot (in .env), you will come across several options.

**DISCORD_CHANNEL** The id of the channel you want the bot to send chat messages to. You can retrieve the id of a channel by right clicking on a channel, and clicking "Copy ID". Must have Developer Mode enabled.

**BOT_TOKEN** The token of the discord bot. You can create one by going [here](https://discord.com/developers/applications/me), clicking "New Application", navigating to the "Bot" section, clicking "Create New Bot", and then copying the bot's token.

**YOUR_ID** The id of your discord account. You can retrieve it by right clicking on your avatar in a message, and clicking "Copy Id".

**MINECRAFT_EMAIL** & **MINECRAFT_PASS** Your minecraft account details

**SERVER** The server tracc joins on startup.

**PREFIX** The prefix the discord bot uses

**PING_ON_MENTION** Depicts whether or not the bot will ping you when you're mentioned in Minecraft. true/false

**MICROSOFT_ACCOUNT** true/false, determines if tracc should use Microsoft authentication or not.

**VERSION** (optional) The version of Minecraft the bot should join with

## Usage

You can make your account talk via the bot by typing in the channel specified in **DISCORD_CHANNEL**. To run a command, say **/(whatever command and whatever arguments)**

You can create a tag with **!tag set (name) (content)**.<br> You can delete a tag with **!tag delete (name)**.<br> You can view a tag's source with **!tag source (name)**.<br> You can view the list of tags with **!list** or **!tags**.

You can grant tag access to a user with **!manager grant (mention user or put user's id)**.<br>You can revoke a user's tag access with **!manager revoke (mention user or put user's id)**.

You can leave a server with **!leave**.<br> You can join a server with **!join (ip)**, it requires you to run **!leave** first however.<br> You can switch to another server with **!switch (ip)**, it does not require you to run **!leave**.

You can use a tag with **!(tag name)**. Note that it must be ran in **DISCORD_CHANNEL**.

## Contribution

Looking to contribute to tracc? You've come to the right place to figure out how!

Just head over to the [Issue Tracker](https://github.com/honkling/tracc/issues/new/choose), choose the template you want to use, fill in the fields required, and click **Submit new issue!**

Pull requests are always welcome aswell.
