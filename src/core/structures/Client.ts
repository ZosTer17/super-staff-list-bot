import { Client, Collection, GatewayIntentBits, Partials, VoiceBasedChannel } from "discord.js";
import { CommandManager } from "../managers/CommandManager";
import { EventManager } from "../managers/EventManager";
import { ComponentManager } from "../managers/ComponentManager";
import { Stafflist } from "./Stafflist";
// import { CommandManager } from "./structures/managers/CommandManager";
// import { EventManager } from "./managers/EventManager";
// import { ModalManager } from "./structures/managers/ModalManager";
// // import { MenuManager } from "./structures/managers/MenuManager";
// import { ComponentManager } from "./structures/managers/ComponentManager";

export class SuperStafflist extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.MessageContent
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Message,
                Partials.Reaction,
                Partials.ThreadMember,
                Partials.User
            ]
        });
    };

    public commandManager = new CommandManager(this);
    public eventManager = new EventManager(this);
    public componentManager = new ComponentManager();

    public cooldowns = new Collection<string, Collection<string, number>>();
    public stafflists = new Collection<string, Stafflist>;

    public readonly baseDir = "./src";
    
    private isRealoding = false;

    public async start(reload = false) {
        this.isRealoding = reload;
        
        try {
            await this.load();
            
            if (!reload)
                await this.login(process.env.DISCORD_CLIENT_TOKEN!);  
            
            await this.commandManager.publish();   
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                process.exit(1);
            };
        };
    };

    private async load() {
        return Promise.all([
            this.eventManager.loadAll(),
            this.commandManager.loadAll(),
            this.componentManager.loadAll()
            // this.modalManager.loadAll()
        ]);
    };

    public isReloading() {
        return this.isRealoding;
    };
};