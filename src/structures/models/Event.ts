// import { Awaitable, ClientEvents } from "discord.js";
// import { EventEmitter } from "events";
// import { TicketEvents } from "../models/Ticket";

// interface EventOptions<K extends keyof Events> {
//     name: K;
//     listener: EventEmitter;
//     once?: boolean;
// };

// export type Events = ClientEvents & TicketEvents;

// export abstract class Event<K extends keyof Events> {
//     constructor(public options: EventOptions<K>) {
//         const { listener, name, once } = options;

//         once
//             ? listener.once(name, (...args: Events[keyof Events]) => this.run(...args as any))
//             : listener.on(name, (...args: Events[keyof Events]) => this.run(...args as any));
//     };

//     abstract run(...args: Events[K]): Awaitable<void>;
// };