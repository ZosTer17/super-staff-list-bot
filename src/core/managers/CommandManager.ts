import { REST, Routes } from "discord.js";
import { InteractionsType } from "../../types/Interactions";
import { Manager } from "./Manager";

const clientId = "1252210485210775676";

type CommandType = InteractionsType.ChatInput | InteractionsType.Message | InteractionsType.User;

export class CommandManager extends Manager<string, CommandType> {
    private rest = new REST().setToken(process.env.DISCORD_CLIENT_TOKEN!);

    constructor() {
        super("commands");
    };
    
    public async loadAll() {
        const commands = await this.loadFiles();

        for (const command of commands)
            this.data.set(command.options.data.name, command);
    };

    public async publish() {
        await this.rest.put(
            Routes.applicationCommands(clientId),
            { body: this.data.map(c => c.options.data.toJSON()) }
        );

        console.log(`Registrati in collection e caricati ${this.data.size} comandi`);
    };
};