import { ClientEvents } from "discord.js";
import { Event } from "../structures/Event";
import { Manager } from "./Manager";
import client from "../..";

export class EventManager extends Manager<string, Event<keyof ClientEvents>> {
    constructor() {
        super("events");
    };
    
    public async loadAll() {
        const events = await this.loadFiles();

        for (const event of events) {
            event.options.once 
                ? client.once(event.options.name, (...args) => event.execute(...args))
                : client.on(event.options.name, (...args) => event.execute(...args));

            this.data.set(event.options.name, event);
        };

        console.log(`Registrati in collection e caricati ${this.data.size} eventi`);
    };
};