const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ruleagree')
        .setDescription('Sends a message for people to agree to the rules & get a role')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction) {
        const button = new ButtonBuilder()
            .setCustomId('1002723507131666436')
            .setLabel('Agree')
            .setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder()
            .addComponents(button);
        await interaction.reply({ content: "To agree to the rules, please press the \"Agree\" button.", components: [row] });
    }
}
