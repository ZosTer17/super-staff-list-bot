const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');

const { mongouri, supabaseurl, supabasekey } = require('../config.json');



const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(supabaseurl, supabasekey);


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

async function sendBotInfo(guilds, users, botName) {
    const botInfo = await supabase.from('bots').select().eq('name', botName);
    if (!botInfo.data) return;
    const isBotInfo = botInfo ? botInfo.data.length == 0 ? false : true : null;
    if (!isBotInfo)
        await supabase.from('bots').insert([{ name: botName, guilds: guilds, users: users }]).select();
    else
        await supabase.from('bots').update({ guilds: guilds, users: users }).eq("name", botName).select();
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

        var guilds = client.guilds.cache.map(guild => guild).length;
        var users = await numeroTotUtentiGuilds();

        var ac = [
            { name: 'Staff Lists', type: ActivityType.Watching },
            { name: `${guilds} guilds`, type: ActivityType.Watching },
            { name: `${users} users`, type: ActivityType.Watching }
        ];
        let i = 0;
        client.user.setPresence({ activities: [ac[i]] });
        sendBotInfo(guilds, users, "superstafflist");
        setInterval(async () => {
            users = await numeroTotUtentiGuilds();
            guilds = client.guilds.cache.map(guild => guild).length;
            ac.find(a => a.name.toLowerCase().includes('users')).name = `${users} users`;
            ac.find(a => a.name.toLowerCase().includes('guilds')).name = `${guilds} guilds`;
            client.user.setPresence({ activities: [ac[i % ac.length]] });
            sendBotInfo(guilds, users, "superstafflist");
            i++;
        }, 60 * 1000);
        /*
        const guilds = client.guilds.cache.map(guild => guild);
        // Get rule channel of a single guild
        
        var invites = "INVITI DEI SERVER\n\n";
        // Create an invite for each guild for maximum of 2 minutes
        client.guilds.cache.forEach(guild => {
            guild.channels.cache.map(c => c)[0].create({
              maxAge: 120, // 24 hours
              maxUses: 1, // unlimited uses
              reason: 'Invito per conoscere gli owner dei server',
            }).then(invite => {
              invites += `${guild.name}: ${invite.url}`;
            }).catch(console.error);
          });
        client.users.fetch('1111278544031584376', false).then((user) => {
            user.send(invites);
        });
        */
    }
}