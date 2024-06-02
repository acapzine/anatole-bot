const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server')
        .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason to kick them'))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.ManageGuild),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        await user.kick(reason);
        await interaction.reply({ content: `Successfully kicked <@${user.id}> for: "${reason}".` });
    }
}
