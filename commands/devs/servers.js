const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, GatewayIntentBits, PermissionsBitField, Attachment, AttachmentBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servers')
        .setDescription('Lista server in cui è dentro il bot'),
    onlydevs: true,
    memberPermissions: [PermissionsBitField.Flags.Administrator],
    botPermissions: [
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.EmbedLinks
    ],
    async execute(interaction) {
        const descrizioneEmbed = client.guilds.cache.map(guild => guild).sort((a, b) => b.memberCount - a.memberCount).map(guild => `${guild.name} - (${guild.id}) -> ${guild.memberCount}`).join("\n");
        const attachment = new AttachmentBuilder(Buffer.from(descrizioneEmbed), {name: "servers.txt"});
        interaction.reply({
            files: [attachment]
        });

    }
}