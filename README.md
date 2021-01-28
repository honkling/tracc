# tracc

**tracc** is a bot that joins a Minecraft server, and outputs all chat to the terminal. You can also use the terminal to chat.

## Content

- [Configuration](https://github.com/honkling/tracc/tree/terminal/#configuration)
- [Usage](https://github.com/honkling/tracc/tree/terminal/#usage)
- [How to Contribute](https://github.com/honkling/tracc/#contribution)

## Configuration

When configuring the bot (in .env), you will come across several options.

**MINECRAFT_EMAIL** & **MINECRAFT_PASS** Your minecraft account details

**SERVER** The server tracc joins on startup.

**PREFIX** The prefix the discord bot uses

**VERSION** (optional) The version of Minecraft the bot should join with

## Usage

You can create a tag with **<prefix>tag set (name) (content)**.<br> You can delete a tag with **<prefix>tag delete (name)**.<br> You can view a tag's source with **<prefix>tag source (name)**.<br> You can view the list of tags with **<prefix>tags**.

You can leave a server with **<prefix>leave**.<br> You can join a server with **<prefix>join (ip)**, it requires you to run **<prefix>leave** first however.<br> You can switch to another server with **<prefix>switch (ip)**, it does not require you to run **<prefix>leave**.

You can use a tag with **<prefix>(tag name)**.

## Contribution

Looking to contribute to tracc? You've come to the right place to figure out how!

Just head over to the [Issue Tracker](https://github.com/honkling/tracc/issues/new/choose), choose the template you want to use, fill in the fields required, and click **Submit new issue!**

Pull requests are always welcome aswell.
