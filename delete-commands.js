const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID, { body: [] }))
            .then(() => console.log('Successfully deleted all Guild Commands.'))
            .catch(err => console.error(err));
        rest.put(Routes.applicationCommands(process.env.CLIENT_ID, { body: [] }))
            .then(() => console.log('Successfully deleted all Global Commands.'))
            .catch(err => console.error(err));
	} catch (error) {
		console.error(error);
	}
})();