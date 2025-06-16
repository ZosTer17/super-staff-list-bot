import { Events } from "discord.js";
import { Event } from "../../core/structures/Event";
import client from "../..";

class Ready extends Event<Events.ClientReady> {
    constructor() {
        super({
            name: Events.ClientReady,
            once: true
        });
    };

    public execute() {
        console.log(`${client.user?.username} è online!`);
    };
};

export default new Ready();