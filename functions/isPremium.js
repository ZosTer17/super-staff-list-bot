const { supportGuildId } = require("../config.json");

module.exports = async (guild) => {
    if (!guild) return;
    const supportGuild = client.guilds.cache.get(supportGuildId);
    const ownerId = guild.ownerId;
    if (!ownerId) return;
    const guildOwnerInSupportServer = (await supportGuild.members.fetch().catch(err => console.log(err))).map(m => m).find(m => m.user.id === ownerId);
    return !guildOwnerInSupportServer ? false : true;
};