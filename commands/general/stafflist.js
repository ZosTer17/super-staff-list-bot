const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, GatewayIntentBits, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stafflist')
        .setDescription('Crea una nuova staff list')
        .addChannelOption(option =>
            option.setName('canale')
                .setDescription('Canale della staff list')
                .setRequired(true)
        ),
    memberPermissions: [PermissionsBitField.Flags.Administrator],
    botPermissions: [
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.EmbedLinks
    ],
    async execute(interaction) {
        // get option
        const channel = interaction.options.getChannel('canale');
        if (channel.type != ChannelType.GuildText)
            return await interaction.reply({
                content: `Tipologia del canale non adatta per inviare la staff list`,
                ephemeral: true
            });
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Crea la staff list")
                    .setDescription("Utilizza i pulsanti qui sotto per modificare le opzioni")
                    .addFields([
                        { name: "Canale d'invio", value: interaction.options.getChannel('canale').toString() },
                        { name: "Ruoli staff", value: 'Nessun ruolo impostato' },
                        { name: "Stile", value: '{role}: {count}\n-> {user}' },
                        { name: "TAG Ruolo", value: 'ON' },
                        { name: "TAG Utente", value: 'ON' }
                    ])
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('stafflist-add_role')
                        .setStyle(ButtonStyle.Success)
                        .setLabel('Aggiungi ruolo'),
                    new ButtonBuilder()
                        .setCustomId('stafflist-remove_role')
                        .setStyle(ButtonStyle.Danger)
                        .setLabel('Rimuovi ruolo')
                ),
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('stafflist-modify_style')
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel('Modifica stile'),
                    new ButtonBuilder()
                        .setCustomId('stafflist-send_and_save')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Invia nel canale'),
                ),
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('stafflist-modify_role_tag')
                        .setStyle(ButtonStyle.Success)
                        .setLabel('Tag Ruolo'),
                    new ButtonBuilder()
                        .setCustomId('stafflist-modify_user_tag')
                        .setStyle(ButtonStyle.Success)
                        .setLabel('Tag Utente'),
                )
            ],
        });
    }
}