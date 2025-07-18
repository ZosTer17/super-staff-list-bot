const { Events, Status, ActivityType } = require("discord.js");

const mongoose = require("mongoose");

const { mongoUri } = require("../config.json");
const panels = require("../schemas/panels");

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
    name: Events.ClientReady,
    async execute(bot) {
        console.log(`${bot.user.username} -> ONLINE`);

        // Connessione al db
        await mongoose.connect(mongoUri);

        const activities = [
            {
                name: `${((await panels.find({})).length)} staff lists`,
                type: ActivityType.Listening,
            },
            {
                name: 'users',
                type: ActivityType.Watching,
            }
        ];

        let i = 0;

        const selectedStatus = "online";
        client.user.setStatus(selectedStatus);

        bot.user.setActivity(activities[0]);

        setInterval(async () => {
            activities[0].name = `${((await panels.find({})).length)} staff lists`;
            activities[1].name = `${(await numeroTotUtentiGuilds())} users`;
            //activities[2].name = `${(client.guilds.cache.size)} guilds`;
            bot.user.setActivity(activities[i % activities.length]);
            i++;
        }, 30000);
    }
};