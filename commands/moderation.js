const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the guild')
        .addSubcommand(subcommand => subcommand
            .setName('user')
            .setDescription('A user in the server to ban')
            .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason to ban the user'))
        )
        .addSubcommand(subcommand => subcommand
            .setName('id')
            .setDescription('Bans an ID rather than a user in the server')
            .addStringOption(option => option.setName('id').setDescription('The ID to ban').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason to ban the user'))
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.ManageGuild),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';

            await interaction.guild.bans.create(`${user.id}`, { reason: reason });
            await interaction.reply({ content: `Successfully banned <@${user.id}> for: "${reason}".`, ephemeral: true });
        } else if (interaction.options.getSubcommand() === 'id') {
            const id = interaction.options.getString('id');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';

            await interaction.guild.bans.create(`${id}`, { reason: reason });
            await interaction.reply({ content: `Successfully banned <@${id}> for: "${reason}.`, ephemeral: true });
        }
    }
}
