const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gameban')
        .setDescription('Bans a player from Anatole\'s Hotels & Resorts\' games')
        .addSubcommand(subcommand => subcommand
            .setName('userid')
            .setDescription('Bans a user with a UserID')
            .addStringOption(option => option.setName('userid').setDescription('The UserID of the user to ban').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason to ban the user'))
        )
        .addSubcommand(subcommand => subcommand
            .setName('username')
            .setDescription('Bans a user with a username')
            .addStringOption(option => option.setName('username').setDescription('The username of the user to ban').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason to ban the suer'))
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild | PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const listid = ""; // you can get your list id through adding '.json' to the end of a card url
        if (interaction.options.getSubcommand() === 'userid') {
            const userid = interaction.options.getString('userid');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';

            await fetch('https://api.trello.com/1/cards', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: process.env.TRELLO_TOKEN,
                    key: process.env.TRELLO_KEY,
                    idList: listid,
                    name: userid,
                    desc: reason
                })
            });
            await interaction.reply({ content: `Successfully banned user #${userid} from all AH&R games for: "${reason}".`, ephemeral: true });
        } else if (interaction.options.getSubcommand() === 'username') {
            const username = interaction.options.getString('username');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';

            await fetch('https://api.trello.com/1/cards', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: process.env.TRELLO_TOKEN,
                    key: process.env.TRELLO_KEY,
                    idList: listid,
                    name: username,
                    desc: reason
                })
            });
        }
    }
}
