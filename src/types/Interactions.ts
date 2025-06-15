import { 
    ButtonBuilder,
    ButtonInteraction, 
    ChannelSelectMenuBuilder, 
    ChannelSelectMenuInteraction, 
    ChatInputCommandInteraction, 
    ContextMenuCommandBuilder, 
    MessageContextMenuCommandInteraction, 
    ModalBuilder, 
    ModalSubmitInteraction, 
    PermissionResolvable, 
    RoleSelectMenuBuilder, 
    RoleSelectMenuInteraction, 
    SlashCommandBuilder, 
    StringSelectMenuBuilder, 
    StringSelectMenuInteraction, 
    UserContextMenuCommandInteraction 
} from "discord.js";

export enum InteractionsType {
    ChatInput, 
    User, 
    Message, 
    Button,
    Modal,
    StringSelect,
    ChannelSelect,
    RoleSelect
};

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
    [InteractionsType.Modal]: [ModalBuilder, ModalSubmitInteraction];
    [InteractionsType.StringSelect]: [StringSelectMenuBuilder, StringSelectMenuInteraction];
    [InteractionsType.ChannelSelect]: [ChannelSelectMenuBuilder, ChannelSelectMenuInteraction];
    [InteractionsType.RoleSelect]: [RoleSelectMenuBuilder, RoleSelectMenuInteraction];
};

export abstract class Base<T extends InteractionsType> {
    constructor(public options: IData<T>) {};
    
    abstract execute(interaction: InteractionMap[T][1]): Promise<void>;
};