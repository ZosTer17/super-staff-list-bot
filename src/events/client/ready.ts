// import { Event } from "../../structures/models/Event";
import client from "../..";

class Ready  {
    constructor() {
        // super({
        //     name: "ready", 
        //     listener: client, 
        //     once: true
        // });
    };

    public run() {
        console.log(`Registrato come: ${client.user?.tag}`);       
    };
};

export default new Ready();