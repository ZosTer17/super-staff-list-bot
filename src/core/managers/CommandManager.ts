import { REST, Routes } from "discord.js";
import { Command, CommandType } from "../../types/Interactions";
import { Manager } from "./Manager";

export class CommandManager extends Manager<string, Command<CommandType>> {
    private clientId = "1252210485210775676";
    private rest = new REST().setToken(process.env.DISCORD_CLIENT_TOKEN!);

    constructor() {
        super("commands");
    };
    
    public async loadAll() {
        const commands = await this.loadFiles();

        for (const command of commands)
            this.data.set(command.getName(), command);
    };

    public async publish() {
        await this.rest.put(
            Routes.applicationCommands(this.clientId),
            { body: this.data.map(c => c.options.data.toJSON()) }
        );

        console.log(`Registrati in collection e caricati ${this.data.size} comandi`);
    };
};