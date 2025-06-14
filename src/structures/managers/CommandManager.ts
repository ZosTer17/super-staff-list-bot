// import { REST, Routes } from "discord.js";
// import { SlashCommand } from "../models/Command";
// // import { clientId } from "../../config/config.json";
// import { Manager } from "./Manager";

// export class CommandManager extends Manager<string, SlashCommand> {    
//     private rest = new REST().setToken(process.env.DISCORD_CLIENT_TOKEN!);
//     protected dir = "commands";
    
//     public async publish() {
//         await this.rest.put(
//             Routes.applicationCommands(clientId),
//             { body: this.data.map(c => c.data) }
//         );

//         console.log(`Registrati in collection e caricati ${this.data.size} comandi`);
//     };
// };