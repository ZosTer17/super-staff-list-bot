const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');

const { mongouri } = require('../config.json');

async function numeroTotUtentiGuilds() {
    try {
        let contatore = 0; // Inizializza un contatore a 0
        const guilds = client.guilds.cache.map(guild => guild);
        for (let i = 0; i < guilds.length; i++) {
            const members = await guilds[i].members.fetch();
            const usersCount = Number(members.map(m => m.user.bot).filter(isBot => !isBot).length);
            contatore += usersCount;
        }
        return contatore;
    } catch (error) {
    }
}

module.exports = {
    name: "ready",
    async execute(bot) {
        console.log("----------------------------------------")
        console.log("----------------------------------------")
        console.log(bot.user.username + " --> ONLINE")
        console.log("----------------------------------------")
        console.log("----------------------------------------")

        await mongoose.connect(mongouri);

        var ac = [
            { name: 'Staff Lists', type: ActivityType.Watching },
            { name: `${client.guilds.cache.map(guild => guild).length} guilds`, type: ActivityType.Watching },
            { name: `${await numeroTotUtentiGuilds()} users`, type: ActivityType.Watching }
        ];
        let i = 0;
        client.user.setPresence({ activities: [ac[i]] });
        setInterval(async () => {
            ac.find(a => a.name.toLowerCase().includes('users')).name = `${await numeroTotUtentiGuilds()} users`;
            ac.find(a => a.name.toLowerCase().includes('guilds')).name = `${client.guilds.cache.map(guild => guild).length} guilds`;
            client.user.setPresence({ activities: [ac[i % ac.length]] });
            i++;
        }, 60 * 1000);

        console.log(client.guilds.cache.map(guild => guild.name))
    }
}