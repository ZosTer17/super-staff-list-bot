import { Collection, REST, Routes } from "discord.js";
import { Command, CommandType } from "../structures/Command";
import { SuperStafflist } from "../structures/Client";
import { Manager } from "./Manager";

type Commands<K extends CommandType> = Collection<string, Command<K>>;

export class CommandManager<K extends CommandType> extends Manager<K, Commands<K>> {
    private rest = new REST().setToken(process.env.DISCORD_CLIENT_TOKEN!);

    constructor(private client: SuperStafflist) {
        super("commands");

        Object.values(CommandType).map(k => this.data.set(k as K, new Collection()));
    };
    
    public async loadAll() {
        const commands = await this.loadFiles();

        for (const command of commands)
            this.data.get(command.type)?.set(command.getName(), command);
    };

    public async publish() {
        await this.rest.put(
            Routes.applicationCommands(this.client.user!.id),
            { body: this.modules.map(c => c.options.data.toJSON()) }
        );
          
        console.log(`Registrati in collection e caricati ${this.data.size} comandi`);
    };
};