import { ClientEvents } from "discord.js";
import { Event } from "../structures/Event";
import { Manager } from "./Manager";
import { SuperStafflist } from "../structures/Client";

export class EventManager extends Manager<string, Event<keyof ClientEvents>> {
    constructor(private client: SuperStafflist) {
        super("events");
    };
    
    public async loadAll() {
        const events = await this.loadFiles();

        for (const event of events) {
            event.options.once 
                ? this.client.once(event.options.name, (...args) => event.execute(...args))
                : this.client.on(event.options.name, (...args) => event.execute(...args));

            this.data.set(event.options.name, event);
        };

        console.log(`Registrati in collection e caricati ${this.data.size} eventi`);
    };
};