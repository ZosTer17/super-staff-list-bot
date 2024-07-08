const sortTagsRoles = require('./sortRolesTags');

module.exports = (guild, rolesTagsText, removeRole) => {
    var rolesTags = rolesTagsText.split('\n');
    rolesTags.splice(rolesTags.indexOf(removeRole), 1)
    const modifiedRoles = rolesTags.join('\n');
    return sortTagsRoles(guild, modifiedRoles)
};