const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Gets information on a discord user')
        .addUserOption(option => option.setName('user').setDescription('The user to get information on').setRequired(true))
        .setDMPermission(false),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}`)
            .setDescription(`> **Display Name**: ${user.displayName}\n> **ID**: ${user.id}\n> **Joined**: <t:${user.joinedTimestamp}:T>`)
            .setColor([255, 255, 255]);
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}
