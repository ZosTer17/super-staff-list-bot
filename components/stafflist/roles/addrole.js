const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, InteractionResponse } = require('discord.js');

const sortTagsRoles = require('../../../functions/sortRolesTags');
const isDuplicatedTagsRoles = require('../../../functions/isDuplicatedTagsRoles');

module.exports = {
    id: "stafflist-add_role",
    onlystaff: true,
    async execute(interaction) {
        const filter = (m) => m.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 2 * (60 * 1000), max: 1 });
        const embed = new EmbedBuilder()
            .setTitle("Aggiungi un ruolo")
            .setDescription("Tagga un ruolo che vuoi aggiungere")
            .setColor("#2f3136")
            .setFooter({ text: "Super Staff List", iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
        const messageAlert = await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
        collector.on('end', collection => {
            const newRoleMsg = collection.map(msg => msg)[0];
            const newRoleId = newRoleMsg ? newRoleMsg.content.slice(3, newRoleMsg.content.length - 1) : null;
            const role = interaction.guild.roles.cache.get(newRoleId);
            newRoleMsg ? newRoleMsg.delete() : null;
            if (role) {
                const optionEmbed = interaction.message.embeds[0].data;
                if (isDuplicatedTagsRoles(optionEmbed.fields[1].value, `<@&${role.id}>`)) return;
                const newRoles =
                    optionEmbed.fields[1].value == "Nessun ruolo impostato"
                        ?
                        { name: optionEmbed.fields[1].name, value: `<@&${role.id}>` }
                        :
                        { name: optionEmbed.fields[1].name, value: sortTagsRoles(interaction.guild, optionEmbed.fields[1].value += `\n<@&${role.id}>`) };
                const newOptionEmbed = new EmbedBuilder(optionEmbed)
                    .setFields(optionEmbed.fields[0], newRoles, optionEmbed.fields[2], optionEmbed.fields[3], optionEmbed.fields[4]);
                interaction.message.edit({
                    embeds: [newOptionEmbed]
                });
            }
        });
    }
}