import { ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command, CommandType } from "../../core/structures/Command";

class Ping extends Command<CommandType.ChatInput> {
    readonly type = CommandType.ChatInput;

    constructor() {
        super({
            data: new SlashCommandBuilder()
                .setName("ping")
                .setDescription("pong")
        });
    };

    public async execute(interaction: ChatInputCommandInteraction) {
        const row = new ActionRowBuilder<ButtonBuilder>();
        // const click = Component.get("1") as ButtonBuilder;
        
        // row.setComponents(click);

        await interaction.reply({
            content: "pong",
            components: [row]
        });
    };
};

export default new Ping();