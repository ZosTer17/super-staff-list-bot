const { EmbedBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    id: "stafflist-modify_style",
    memberPermissions: [PermissionsBitField.Flags.Administrator],
    botPermissions: [
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.EmbedLinks
    ],
    async execute(interaction) {
        const filter = (m) => m.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 1 * (5 * 1000), max: 1 });
        const embed = new EmbedBuilder()
            .setTitle("Aggiungi lo stile")
            .setDescription("Esempio:\n{role}: {count}\n-> {user}\n(DUE RIGHE)")
            .setColor("#2f3136")
            .setFooter({ text: "Super Staff List", iconURL: interaction.guild.iconURL() })
            .setTimestamp()
        const messageAlert = await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
        collector.on('end', collection => {
            const newStyle = collection.map(msg => msg)[0];
            if (newStyle) {
                const styles = newStyle.content.split('\n');
                newStyle.delete();
                if (!(styles[0].includes('{role}') && styles[0].includes('{count}') && styles[1].includes('{user}'))) return;
                const optionEmbed = interaction.message.embeds[0].data;
                const newOptionEmbed = new EmbedBuilder(optionEmbed)
                    .setFields(optionEmbed.fields[0], optionEmbed.fields[1], { name: optionEmbed.fields[2].name, value: newStyle.content }, optionEmbed.fields[3], optionEmbed.fields[4]);
                interaction.message.edit({
                    embeds: [newOptionEmbed]
                });
            }
        });
    }
}