const { EmbedBuilder } = require('discord.js');
const panels = require('../../schemas/panels');
module.exports = {
    id: "stafflist-send_and_save",
    onlystaff: true,
    async execute(interaction) {
        const configEmbed = interaction.message.embeds[0].data;
        const staffRolesTags = configEmbed.fields[1].value == "Nessun ruolo impostato" ? null : configEmbed.fields[1].value.split('\n');
        const staffRoles = !staffRolesTags ? null : staffRolesTags.map(tag => tag.slice(3, tag.length - 1)).map(id => {
            const role = interaction.guild.roles.cache.get(id);
            if (role) return role;
        }).filter(role => role);
        if (!staffRoles)
            return await interaction.reply({
                content: "Non hai impostato nessun ruolo",
                ephemeral: true
            });
        await interaction.guild.members.fetch().catch(err => console.log(err));
        var usersXRole = [];
        staffRoles.forEach(role => {
            usersXRole.push(role.members.map(m => m.user));
        });
        const tags = { role: configEmbed.fields[3].value == 'ON', user: configEmbed.fields[4].value == 'ON' };
        const styles = configEmbed.fields[2].value.split('\n');

        var rolesDisplay = tags.role ? staffRoles.map(role => `<@&${role.id}>`) : staffRoles.map(role => role.name);
        var usersXRoleDisplay = tags.user ? usersXRole.map(users => users.map(user => `<@${user.id}>`)) : usersXRole.map(users => users.map(user => user.username));
        console.log(rolesDisplay, usersXRoleDisplay);


        const description = `${rolesDisplay.map((role, index) =>
            `${styles[0].replace('{role}', role).replace('{count}', usersXRoleDisplay[index].length)}\n${usersXRoleDisplay[index].map(user => `${styles[1].replace('{user}', user)}`).join('\n')}`).join('\n\n')}`;
        const embed = new EmbedBuilder()
            .setTitle('Staff list')
            .setDescription(description)
            .setFooter({ text: "Super Staff List", iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) })
        const channelid = configEmbed.fields[0].value.slice(2, configEmbed.fields[0].value.length - 1);
        const staffListMsg = await interaction.guild.channels.cache.get(channelid).send({
            embeds: [embed]
        });

        await panels.create({
            id: staffListMsg.id,
            channelid: channelid,
            guildid: interaction.guild.id,
            style: styles.join('\n'),
            tags: tags,
            roles: staffRoles.map((role) => (
                {
                    id: role.id,
                }
            ))
        });

        await interaction.reply({
            content: `Hai inviato la lista staff nel canale <#${channelid}>`,
            ephemeral: true
        })

    }
}