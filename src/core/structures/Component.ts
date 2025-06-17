import { 
    ButtonBuilder, 
    ButtonInteraction, 
    ChannelSelectMenuBuilder, 
    ChannelSelectMenuInteraction, 
    ComponentType as DiscordComponentType,
    MentionableSelectMenuBuilder, 
    MentionableSelectMenuInteraction, 
    PermissionResolvable, 
    RoleSelectMenuBuilder, 
    RoleSelectMenuInteraction, 
    StringSelectMenuBuilder,
    StringSelectMenuInteraction,
    UserSelectMenuBuilder,
    UserSelectMenuInteraction
} from "discord.js";
import client from "../..";

export enum ComponentType {
    Button = "button",
    // Modal,
    StringSelect = "stringSelect",
    ChannelSelect = "channelSelect",
    RoleSelect = "roleSelect",
    MentionableSelect = "mentionableSelect",
    UserSelect = "userSelect"
};

export type ComponentMap = {
    [ComponentType.Button]: [ButtonBuilder, ButtonInteraction];
    // [ComponentType.Modal]: [ModalBuilder, ModalSubmitInteraction];
    [ComponentType.StringSelect]: [StringSelectMenuBuilder, StringSelectMenuInteraction];
    [ComponentType.ChannelSelect]: [ChannelSelectMenuBuilder, ChannelSelectMenuInteraction];
    [ComponentType.MentionableSelect]: [MentionableSelectMenuBuilder, MentionableSelectMenuInteraction];
    [ComponentType.RoleSelect]: [RoleSelectMenuBuilder, RoleSelectMenuInteraction];
    [ComponentType.UserSelect]: [UserSelectMenuBuilder, UserSelectMenuInteraction];
};

export const componentTypeMap = {
    [DiscordComponentType.Button]: ComponentType.Button,
    [DiscordComponentType.StringSelect]: ComponentType.StringSelect,
    [DiscordComponentType.ChannelSelect]: ComponentType.ChannelSelect,
    [DiscordComponentType.MentionableSelect]: ComponentType.MentionableSelect,
    [DiscordComponentType.RoleSelect]: ComponentType.RoleSelect,
    [DiscordComponentType.UserSelect]: ComponentType.UserSelect
};

export interface IComponent<T extends ComponentType> {
    data: ComponentMap[T][0];
    optionsInCustomId?: boolean;
    cooldown?: number;
    isDev?: boolean;
    botPermissions?: PermissionResolvable[];
    memberPermissions?: PermissionResolvable[];
};

export abstract class Component<T extends ComponentType> {
    abstract readonly type: T;

    constructor(public options: IComponent<T>) {};

    static get<T extends keyof typeof componentTypeMap>(type: T, customId: string) {
        return client.componentManager.data.get(componentTypeMap[type])?.get(customId);
    };

    abstract execute(interaction: ComponentMap[T][1]): Promise<void>;

    public getCustomId(): string {
        const data = this.options.data.data;

        if(!("custom_id" in data))
            throw new Error("I bottoni URL non hanno customId");

        return data.custom_id!;
    };
};