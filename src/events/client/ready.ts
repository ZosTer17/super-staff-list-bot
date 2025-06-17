import { Client, Events } from "discord.js";
import { Event } from "../../core/structures/Event";

class Ready extends Event<Events.ClientReady> {
    constructor() {
        super({
            name: Events.ClientReady,
            once: true
        });
    };

    public execute(client: Client<true>) {
        console.log(`${client.user?.username} è online!`);
    };
};

export default new Ready();