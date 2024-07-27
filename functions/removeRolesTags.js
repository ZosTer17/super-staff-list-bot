const sortTagsRoles = require('./sortRolesTags');

module.exports = (guild, rolesTagsText, removeRole) => {
    var rolesTags = rolesTagsText.split('\n');
    console.log(rolesTags, removeRole);
    if (rolesTags.includes(removeRole) && rolesTags.length == 1) return "Nessun ruolo impostato";
    rolesTags.splice(rolesTags.indexOf(removeRole), 1);
    const modifiedRoles = rolesTags.join('\n');
    return sortTagsRoles(guild, modifiedRoles);
};