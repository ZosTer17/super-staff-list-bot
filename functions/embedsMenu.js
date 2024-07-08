const { ButtonBuilder, ActionRow, ActionRowBuilder, ComponentType, ButtonStyle } = require("discord.js");

module.exports = async (interaction, embeds, btns, time = 30 * 1000) => {
    try {
        if (!interaction || !embeds || !btns) throw new Error("[EmbedMenu] Argomenti non validi")
        await interaction.deferReply();

        var index = 0;

        var prev = new ButtonBuilder()
            .setCustomId("prev")
            .setEmoji('⬅')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true)
        var next = new ButtonBuilder()
            .setCustomId("next")
            .setEmoji('➡')
            .setStyle(ButtonStyle.Secondary)

        if (embeds.length == 1) next.setDisabled(true);

        var buttons = new ActionRowBuilder().addComponents(prev, ...btns[index], next);

        const msg = await interaction.editReply({ embeds: [embeds[index]], components: [buttons], fetchReply: true });

        const collector = await msg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time,
            filter: (interaction) => {
                return ['prev', 'next'].includes(interaction.customId);
              }
        });

        collector.on('collect', async i => {
            console.log(index, embeds.length)
            if (i.user.id != interaction.user.id) return await i.reply({ content: `Non puoi usare un menu che è stato richiesto da un altro utente`, ephemeral: true });
            await i.deferUpdate();

            if (i.customId == "prev" && index > 0) index--;
            if (i.customId == "next" && index < embeds.length - 1) index++;

            if (index == 0) {
                prev.setDisabled(true);
            } else {
                prev.setDisabled(false);
            }
    
            if (index == embeds.length - 1) {
                next.setDisabled(true);
            } else {
                next.setDisabled(false);
            }

            buttons = new ActionRowBuilder().addComponents(prev, ...btns[index], next);

            await msg.edit({ embeds: [embeds[index]], components: [buttons] }).catch(err => console.log(err));

            collector.resetTimer();
        });

        collector.on('end', async () => {
            await msg.edit({ embeds: [embeds[index]], components: [] }).catch(err => console.log(err));
        });

        return msg;
    } catch (e) {
        console.log(e);
    }
};