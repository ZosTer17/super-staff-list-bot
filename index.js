const { Client, GatewayIntentBits, PermissionsBitField, PermissionFlagsBits } = require('discord.js');
const { REST, Routes } = require('discord.js')
const { clientID, token, devs } = require('./config.json')
const fs = require('fs');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,

        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,

        GatewayIntentBits.GuildInvites
    ]
});

function addFileLoadFolder(path, cmds) {
    if (path.endsWith(".txt")) return;
    if (path.endsWith(".js"))
        return cmds.push(require(path));
    var filesOrFolders = fs.readdirSync(path);
    filesOrFolders.forEach(fileOrFolder => {
        addFileLoadFolder(`${path}/${fileOrFolder}`, cmds);
    });
}

var commandsFile = [];
var commandsSlash = [];
addFileLoadFolder("./commands", commandsFile);
commandsFile.forEach(file => {
    commandsSlash.push(file.data.toJSON());
});

const rest = new REST().setToken(token);

(async () => {
    try {
        //console.log(`Started refreshing ${commandsSlash.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(clientID),
            { body: commandsSlash },
        );

        //console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        console.log(`Caricato(i) ${data.length} comando(i).`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();

// COMMANDS HANDLER
client.on("interactionCreate", async (interaction) => {
    //if (!interaction.isCommand()) return;
    if (interaction.isChatInputCommand()) {
        const command = commandsFile.find(cmd => cmd.data.name === interaction.commandName);
        if (!command) return;
        try {
            if (command.onlydevs && !devs.includes(interaction.member.user.id))
                return interaction.reply({ content: "Comando riservato ai dev del bot.", ephemeral: true });
            if (command.botPermissions.some(p => !interaction.guild.members.me.permissions.has(p)))
                return interaction.reply({ content: "Non ho i permessi per eseguire questo comando.", ephemeral: true });
            if (command.memberPermissions.some(p => !interaction.member.permissions.has(p)))
                return interaction.reply({ content: "Non hai i permessi per eseguire questo comando.", ephemeral: true });
            command.execute(interaction);
        } catch (e) {
            console.error(e);
            interaction.reply({ content: "C'è stato un errore nel comando.", ephemeral: true });
        }
    } else if (interaction.isAutocomplete()) {
        const command = commandsFile.find(cmd => cmd.data.name === interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.autocomplete(interaction);
        } catch (error) {
            console.error(error);
        }
    }
});

// EVENTS HANDLER
var eventsFiles = [];
addFileLoadFolder("./events", eventsFiles);
eventsFiles.forEach(event => {
    if (event.name != "timer") {
        client.on(event.name, (...args) => event.execute(...args));
    } else {
        setInterval(() => {
            event.execute();
        }, event.interval);
    }
});

// COMPONENTS HANDLER
var componentsFile = [];
addFileLoadFolder("./components", componentsFile);
client.on("interactionCreate", (interaction) => {
    if (!interaction.isModalSubmit() && !(interaction.isStringSelectMenu() || interaction.isRoleSelectMenu() || interaction.isChannelSelectMenu()) && !interaction.isButton()) return;
    const component = componentsFile.find(component => interaction.customId.startsWith(component.id));
    if (!component) return;
    try {
        if (component.onlydevs && !devs.includes(interaction.member.user.id))
            return interaction.reply({ content: "Comando riservato ai dev del bot.", ephemeral: true });
        if (component.botPermissions.some(p => !interaction.guild.members.me.permissions.has(p)))
            return interaction.reply({ content: "Non ho i permessi per eseguire questo comando.", ephemeral: true });
        if (!devs.includes(interaction.member.user.id) && component.memberPermissions.some(p => !interaction.member.permissions.has(p)))
            return interaction.reply({ content: "Non hai i permessi per eseguire questo comando.", ephemeral: true });
        component.execute(interaction);
    } catch (e) {
        console.error(e);
        interaction.reply({ content: "C'è stato un errore...", ephemeral: true });
    }
});

client.login(token);