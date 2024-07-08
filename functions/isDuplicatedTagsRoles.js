module.exports = (rolesTagsText, role) => {
    var rolesTags = rolesTagsText.split('\n');
    const isDuplicated = rolesTags.find(r => r == role) ? true : false;
    return isDuplicated;
};