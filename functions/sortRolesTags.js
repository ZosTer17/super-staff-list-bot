module.exports = (guild, rolesTagsText) => {
    const rolesIds = rolesTagsText.split('\n').map(role => role.slice(3, role.length - 1));
    const roles = rolesIds.map(roleId => guild.roles.cache.get(roleId));
    const sortedRoles = roles.sort((a, b) => b.position - a.position);
    return sortedRoles.map(role => `<@&${role.id}>`).join('\n');
};