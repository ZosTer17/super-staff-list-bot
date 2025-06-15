import { Events } from "discord.js";
import { Event } from "../../core/structures/Event";

class Ready extends Event<Events.ClientReady> {
    constructor() {
        super({
            name: Events.ClientReady,
            once: true
        });
    };

    public execute() {
        console.log("ciao, tutto pronto");
    };
};

export default new Ready();