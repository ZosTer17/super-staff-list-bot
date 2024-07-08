const { EmbedBuilder } = require('discord.js');
module.exports = {
    id: "stafflist-modify_role_tag",
    onlystaff: true,
    async execute(interaction) {
        var components = interaction.message.components;
        var button = components[2].components[0];
        button.data.style = button.data.style ^ 7;
        var embed = new EmbedBuilder(interaction.message.embeds[0].data)
            .setFields(...interaction.message.embeds[0].data.fields.slice(0, 3), { name: 'TAG Ruolo', value: button.data.style == 3 ? 'ON' : 'OFF' }, interaction.message.embeds[0].data.fields[4])
        await interaction.message.edit({
            embeds: [embed],
            components: components
        });

        await interaction.deferUpdate();
    }
}