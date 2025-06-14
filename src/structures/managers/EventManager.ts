import client from "../..";
// import { Event, Events } from "../models/Event";
import { Manager } from "./Manager";

export class EventManager extends Manager<string, any> {
    protected dir = "events";

    public async loadAll() {
        await this.loadFiles(this.dir);

    };
};