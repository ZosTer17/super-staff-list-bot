import { 
    ActionRowBuilder, 
    ChannelSelectMenuBuilder, 
    ChatInputCommandInteraction, 
    ComponentType,
    PermissionFlagsBits, 
    RoleSelectMenuBuilder, 
    SlashCommandBuilder 
} from "discord.js";
import { Command, CommandType } from "../../core/structures/Command";
import { Component } from "../../core/structures/Component";
import { Stafflist } from "../../core/structures/Stafflist";
import client from "../..";

class StafflistCommand extends Command<CommandType.ChatInput> {
    readonly type = CommandType.ChatInput;

    constructor() {
        super({
            data: new SlashCommandBuilder()
                .setName("stafflist")
                .setDescription("Crea una nuova stafflist")
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
            botPermissions: [PermissionFlagsBits.SendMessages]
        });
    };

    public async execute(interaction: ChatInputCommandInteraction<"cached">) {
        const { guildId } = interaction;

        console.log(guildId);
        

        const stafflist = new Stafflist();
        client.stafflists.set(guildId, stafflist);

        const channelRow = new ActionRowBuilder<ChannelSelectMenuBuilder>();
        const roleRow = new ActionRowBuilder<RoleSelectMenuBuilder>();

        const channelMenu = Component.get(ComponentType.ChannelSelect, "setChannel").data;
        const roleMenu = Component.get(ComponentType.RoleSelect, "setRoles").data;        

        channelRow.setComponents(channelMenu);
        roleRow.setComponents(roleMenu);

        await interaction.reply({
            content: "stafflist...",
            components: [channelRow, roleRow]
        });
    };
};

export default new StafflistCommand();