const fs = require('fs');

class RTJson {
    constructor(path) {
        this.path = path;
    }
    read() {
        return JSON.parse(fs.readFileSync(this.path, () => { }));
    }
    write(obj) {
        fs.writeFileSync(this.path, JSON.stringify(obj, null, 4), () => { });
    }
}

module.exports = { RTJson };