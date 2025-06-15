import { ClientEvents } from "discord.js";

type EventOptions<K extends keyof ClientEvents> = {
    name: K,
    once?: boolean;
};  

export abstract class Event<K extends keyof ClientEvents> {
    constructor(public options: EventOptions<K>) {};

    abstract execute(...args: ClientEvents[K]): void;
};