const { EmbedBuilder } = require('discord.js');
const panels = require("../schemas/panels");

module.exports = {
    name: "ready",
    async execute(bot) {
        setInterval(async () => {
            // Aggiorna tutte le staff list
            const guildsPanels = await panels.find({});
            // console.log(guildsPanels.find(panel => panel.guildid = "1228020687881375895"));
            if (!guildsPanels) return;
            guildsPanels.forEach(async (panel) => {
                const guild = client.guilds.cache.get(panel.guildid);
                if (!guild) return;
                const staffRolesIds = panel.roles.map(role => role.id);
                const staffRoles = staffRolesIds.map(id => {
                    const role = guild.roles.cache.get(id);
                    if (role) return role;
                }).filter(role => role);
                if (staffRoles.length == 0) return; // Se i ruoli non esistono esco
                await guild.members.fetch();
                var usersXRole = [];
                staffRoles.forEach(role => {
                    usersXRole.push(role.members.map(m => m.user));
                });
                const tags = panel.tags;
                const styles = panel.style.split('\n');

                var rolesDisplay = tags.role ? staffRoles.map(role => `<@&${role.id}>`) : staffRoles.map(role => role.name);
                var usersXRoleDisplay = tags.user ? usersXRole.map(users => users.map(user => `<@${user.id}>`)) : usersXRole.map(users => users.map(user => user.username));

                const description = `${rolesDisplay.map((role, index) =>
                    `${styles[0].replace('{role}', role).replace('{count}', usersXRoleDisplay[index].length)}\n${usersXRoleDisplay[index].map(user => `${styles[1].replace('{user}', user)}`).join('\n')}`).join('\n\n')}`;
                const embed = new EmbedBuilder()
                    .setTitle('Staff list')
                    .setDescription(description)
                    .setFooter({ text: "Super Staff List", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                var staffListMsg = null;
                try {
                    staffListMsg = await guild.channels.cache.get(panel.channelid).messages.fetch(panel.id) // .edit({embeds: [embed] });
                } catch (error) {
                    return await panels.deleteOne({ id: panel.id });
                }
                staffListMsg.edit({ embeds: [embed] });
            });


        }, 60 * 1000);
    }
}