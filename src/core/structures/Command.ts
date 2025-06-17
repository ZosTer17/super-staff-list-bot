import { 
    ApplicationCommandType,
    ChatInputCommandInteraction, 
    ContextMenuCommandBuilder, 
    MessageContextMenuCommandInteraction, 
    PermissionResolvable, 
    SlashCommandBuilder, 
    UserContextMenuCommandInteraction
} from "discord.js";
import client from "../..";

export enum CommandType {
    ChatInput = "chatInput", 
    User = "user", 
    Message = "message"
};

export type CommandMap = {
    [CommandType.ChatInput]: [SlashCommandBuilder, ChatInputCommandInteraction]; 
    [CommandType.User]: [ContextMenuCommandBuilder, UserContextMenuCommandInteraction]; 
    [CommandType.Message]: [ContextMenuCommandBuilder, MessageContextMenuCommandInteraction];
};

export const commandTypeMap = {
    [ApplicationCommandType.ChatInput]: CommandType.ChatInput,
    [ApplicationCommandType.User]: CommandType.User,
    [ApplicationCommandType.Message]: CommandType.Message
};

export interface ICommand<T extends CommandType> {
    data: CommandMap[T][0]
    cooldown?: number;
    isDev?: boolean;
    botPermissions?: PermissionResolvable[];
    memberPermissions?: PermissionResolvable[];
};

export abstract class Command<T extends CommandType> {
    abstract readonly type: T;

    constructor(public options: ICommand<T>) {};

    static get<T extends keyof typeof commandTypeMap>(type: T, name: string) {
        return client.commandManager.data.get(commandTypeMap[type])?.get(name);
    };

    abstract execute(interaction: CommandMap[T][1]): Promise<void>;

    public getName() {
        return this.options.data.name;
    };

    public autocomplete() {
        
    };
};