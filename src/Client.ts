import { Client, Collection, GatewayIntentBits, Partials, VoiceBasedChannel } from "discord.js";
// import { CommandManager } from "./structures/managers/CommandManager";
import { EventManager } from "./structures/managers/EventManager";
// import { ModalManager } from "./structures/managers/ModalManager";
// // import { MenuManager } from "./structures/managers/MenuManager";
// import { ComponentManager } from "./structures/managers/ComponentManager";

export class SuperStafflist extends Client {
    constructor() {
        super({
            intents: /** [
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.MessageContent
            ] */ 3276799,
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

    // public commandManager = new CommandManager();
    // public componentManager = new ComponentManager();
    public eventManager = new EventManager();
    // public menuManager = new MenuManager();
    // public modalManager = new ModalManager();
    
    // public commands = this.commandManager.data;
    // public buttons = this.componentManager.buttons;
    public events = this.eventManager.data;
    // public menus = this.componentManager.menus;
    // public modals = this.modalManager.data;

    public cooldowns = new Collection<string, Collection<string, number>>();
    
    public readonly baseDir = __dirname;
    
    private isRealoding = false;

    public async start(reload = false) {
        this.isRealoding = reload;
        
        try {
            if (!reload)
                await this.login(process.env.DISCORD_CLIENT_TOKEN!);  
            
            await this.load();
            // await this.commandManager.publish();   
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
            // this.commandManager.loadAll(),
            // this.componentManager.loadAll(),
            // this.modalManager.loadAll()
        ]);
    };

    public isReloading() {
        return this.isRealoding;
    };
};