import {
    APIChannelSelectComponent as ChannelSelectData,
    APIMentionableSelectComponent as MentionableSelectData,
    APIRoleSelectComponent as RoleSelectData,
    APIStringSelectComponent as StringSelectData,
    APIUserSelectComponent as UserSelectData,
    ComponentType as Types,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction,
    RoleSelectMenuInteraction,
    MentionableSelectMenuInteraction,
    ChannelSelectMenuInteraction,
    Awaitable
} from "discord.js";
import { IModule } from "../managers/Manager";

// type ComponentMap = {
//     [Types.StringSelect]: [StringSelectData, StringSelectMenuInteraction<"cached">];
//     [Types.UserSelect]: [UserSelectData, UserSelectMenuInteraction<"cached">];
//     [Types.RoleSelect]: [RoleSelectData, RoleSelectMenuInteraction<"cached">];
//     [Types.MentionableSelect]: [MentionableSelectData, MentionableSelectMenuInteraction<"cached">];
//     [Types.ChannelSelect]: [ChannelSelectData, ChannelSelectMenuInteraction<"cached">]; 
// };

// export type ComponentType = Exclude<Types, Types.Button | Types.ActionRow | Types.TextInput>;

// export abstract class Menu<T extends ComponentType> {
//     constructor(readonly data: ComponentMap[T][0]) {};
    
//     abstract run(interaction: ComponentMap[T][1]): Awaitable<void>;
// };

export abstract class StringSelectMenu implements IModule {
    constructor(readonly data: StringSelectData, readonly filePath: string) {};

    abstract run(interaction: StringSelectMenuInteraction<"cached">): Awaitable<void>;
};