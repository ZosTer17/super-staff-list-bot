import { 
    ApplicationCommandType,
    AutocompleteInteraction,
    ChatInputCommandInteraction, 
    ContextMenuCommandBuilder, 
    MessageContextMenuCommandInteraction, 
    PermissionResolvable, 
    SlashCommandBuilder, 
    UserContextMenuCommandInteraction
} from "discord.js";
import client from "../..";
import { Base, IData } from "./Base";

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

export interface ICommand<T extends CommandType> extends IData {
    data: CommandMap[T][0];
};

export interface IAutocomplete {
    autocomplete(interaction: AutocompleteInteraction): Promise<void>;
};

export abstract class Command<T extends CommandType> extends Base implements ICommand<T> {
    abstract readonly type: T;
    public data: CommandMap[T][0];

    constructor(options: ICommand<T>) {
        super(options);

        const { data } = options;        
        this.data = data;
    };

    static get<T extends keyof typeof commandTypeMap>(type: T, name: string) {
        const command = client.commandManager.data.get(commandTypeMap[type])?.get(name);
        return command as Command<typeof commandTypeMap[T]>;
    };

    abstract execute(interaction: CommandMap[T][1]): Promise<void>;

    public getName() {
        return this.data.name;
    };
};