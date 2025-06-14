import { APIButtonComponentWithCustomId, Awaitable, ButtonInteraction } from "discord.js";
import { IModule } from "../managers/Manager";

export abstract class Button implements IModule {
    constructor(readonly data: APIButtonComponentWithCustomId, readonly filePath: string) {};
    
    abstract run(interaction: ButtonInteraction<"cached">): Awaitable<void>;
};