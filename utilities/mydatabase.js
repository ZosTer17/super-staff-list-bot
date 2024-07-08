const fs = require('fs');

class MyDatabase {
    constructor(path) {
        this.path = path;
        if (!fs.existsSync(this.path))
            fs.writeFileSync(this.path, "[]", () => { })
    }
    create(obj) {
        var data = fs.readFileSync(this.path, () => { });
        var db = JSON.parse(data);
        db.push(obj);
        fs.writeFileSync(this.path, JSON.stringify(db, null, 2))
    }
    findOne(searchUpdateObj) {
        var data = fs.readFileSync(this.path, () => { });
        var db = JSON.parse(data);
        var resultObj = null;
        for (let key in searchUpdateObj) {
            resultObj = db.find(o => o[key] == searchUpdateObj[key]);
            if (!resultObj) return null;
        }
        return resultObj;
    }
    find(searchObj) {
        var data = fs.readFileSync(this.path, () => { });
        var db = JSON.parse(data);
        if (Object.keys(searchObj).length === 0) {
            return db;
        }
        var resultObj = null;
        for (let key in searchObj) {
            resultObj = db.filter(o => o[key] == searchObj[key]);
            if (!resultObj) return null;
        }
        return resultObj;
    }
    update(searchObj, newObj) {
        var data = fs.readFileSync(this.path, () => { });
        var db = JSON.parse(data);
        var resultObj = null;
        for (let key in searchObj) {
            resultObj = db.find(o => o[key] == searchObj[key]);
            if (!resultObj) return null;
        }
        for (let key in newObj) {
            resultObj[key] = newObj[key];
        }
        fs.writeFileSync(this.path, JSON.stringify(db, null, 2))
    }
    delete(searchObj) {
        var data = fs.readFileSync(this.path, () => { });
        var db = JSON.parse(data);
        var resultObj = null;
        for (let key in searchObj) {
            resultObj = db.find(o => o[key] == searchObj[key]);
            if (!resultObj) return null;
            db.splice(db.indexOf(resultObj), 1)
        }
        fs.writeFileSync(this.path, JSON.stringify(db, null, 2))
    }
}

module.exports = { MyDatabase };