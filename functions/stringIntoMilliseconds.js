module.exports = {
    stringIntoMilliseconds(string) {
        if (!string) return null;
        var unit = string[string.length - 1];
        const units = ['m', 'h', 'd'];
        if (!units.includes(unit)) return null;
        var amount = String(string).slice(0, string.length - 1);
        if (unit == 'm') {
            return amount * (60 * 1000);
        } else if (unit == 'h') {
            return amount * (60 * 60 * 1000);
        } else if (unit == 'd') {
            return amount * (24 * 60 * 60 * 1000);
        }
    }
};