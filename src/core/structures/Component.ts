import { 
    ButtonBuilder, 
    ButtonInteraction, 
    ChannelSelectMenuBuilder, 
    ChannelSelectMenuInteraction, 
    ComponentType as DiscordComponentType,
    MentionableSelectMenuBuilder, 
    MentionableSelectMenuInteraction, 
    RoleSelectMenuBuilder, 
    RoleSelectMenuInteraction, 
    StringSelectMenuBuilder,
    StringSelectMenuInteraction,
    UserSelectMenuBuilder,
    UserSelectMenuInteraction
} from "discord.js";
import { Base, IData } from "./Base";
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
} as const;

export interface IComponent<T extends ComponentType> extends IData {
    data: ComponentMap[T][0];
    optionsInCustomId?: boolean;
};

export abstract class Component<T extends ComponentType> extends Base implements IComponent<T> {
    abstract readonly type: T;
    public data: ComponentMap[T][0];
    public optionsInCustomId?: boolean;

    constructor(options: IComponent<T>) {
        super(options);

        const { data, optionsInCustomId } = options;
        this.data = data;
        this.optionsInCustomId = optionsInCustomId;
    };

    static get<T extends keyof typeof componentTypeMap>(type: T, customId: string) {
        const component = client.componentManager.data.get(componentTypeMap[type])?.get(customId);
        return component as Component<typeof componentTypeMap[T]>;
    };

    abstract execute(interaction: ComponentMap[T][1]): Promise<void>;

    public getCustomId(): string {
        const data = this.data.data;
        
        if(!("custom_id" in data))
            throw new Error("I bottoni URL non hanno customId");
        
        return data.custom_id!;
    };
};