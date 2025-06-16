import { 
    ButtonBuilder,
    ButtonInteraction, 
    ChannelSelectMenuBuilder, 
    ChannelSelectMenuInteraction, 
    ChatInputCommandInteraction, 
    ContextMenuCommandBuilder, 
    MentionableSelectMenuBuilder, 
    MentionableSelectMenuInteraction, 
    MessageContextMenuCommandInteraction, 
    ModalBuilder, 
    ModalSubmitInteraction, 
    PermissionResolvable, 
    RoleSelectMenuBuilder, 
    RoleSelectMenuInteraction, 
    SlashCommandBuilder, 
    StringSelectMenuBuilder, 
    StringSelectMenuInteraction, 
    UserContextMenuCommandInteraction, 
    UserSelectMenuBuilder,
    UserSelectMenuInteraction
} from "discord.js";
import client from "..";

export enum InteractionsType {
    ChatInput, 
    User, 
    Message, 
    Button,
    // Modal,
    StringSelect,
    ChannelSelect,
    RoleSelect,
    MentionableSelect,
    UserSelect
};

export type CommandType = 
    InteractionsType.ChatInput | 
    InteractionsType.User | 
    InteractionsType.Message;

export type ComponentType = 
    InteractionsType.Button | 
    InteractionsType.StringSelect |
    InteractionsType.ChannelSelect |
    InteractionsType.MentionableSelect |
    InteractionsType.RoleSelect |
    InteractionsType.UserSelect;
    // InteractionsType.Modal;

export interface IData<T extends InteractionsType> {
    data: InteractionMap[T][0];
    cooldown?: number;
    isDev?: boolean;
    botPermissions?: PermissionResolvable[];
    memberPermissions?: PermissionResolvable[];
};

export type InteractionMap = {
    [InteractionsType.ChatInput]: [SlashCommandBuilder, ChatInputCommandInteraction]; 
    [InteractionsType.User]: [ContextMenuCommandBuilder, UserContextMenuCommandInteraction]; 
    [InteractionsType.Message]: [ContextMenuCommandBuilder, MessageContextMenuCommandInteraction];
    [InteractionsType.Button]: [ButtonBuilder, ButtonInteraction];
    // [InteractionsType.Modal]: [ModalBuilder, ModalSubmitInteraction];
    [InteractionsType.StringSelect]: [StringSelectMenuBuilder, StringSelectMenuInteraction];
    [InteractionsType.ChannelSelect]: [ChannelSelectMenuBuilder, ChannelSelectMenuInteraction];
    [InteractionsType.RoleSelect]: [RoleSelectMenuBuilder, RoleSelectMenuInteraction];
    [InteractionsType.MentionableSelect]: [MentionableSelectMenuBuilder, MentionableSelectMenuInteraction];
    [InteractionsType.UserSelect]: [UserSelectMenuBuilder, UserSelectMenuInteraction];
};

export abstract class Base<T extends InteractionsType> {
    abstract readonly type: T;

    constructor(public options: IData<T>) {};
    
    abstract execute(interaction: InteractionMap[T][1]): Promise<void>;
};

export abstract class Command<T extends CommandType> extends Base<T> {
    public getName() {
        return this.options.data.name;
    };
};

export abstract class Component<T extends ComponentType> extends Base<T> {
    static get(id: number) {
        return client.componentManager.data.get(id)!.options.data;
    };

    public getId() {
        return this.options.data.data.id!;
    };
};