import { ActionRowBuilder, ButtonBuilder, CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Base, Command, Component, InteractionsType } from "../../types/Interactions";

class Ping extends Command<InteractionsType.ChatInput> {
    readonly type = InteractionsType.ChatInput;

    constructor() {
        super({
            data: new SlashCommandBuilder()
                .setName("ping")
                .setDescription("pong")
        });
    };

    public async execute(interaction: ChatInputCommandInteraction) {
        const row = new ActionRowBuilder<ButtonBuilder>();
        const click = Component.get(1) as ButtonBuilder;
        
        row.setComponents(click);

        await interaction.reply({
            content: "pong",
            components: [row]
        });
    };
};

export default new Ping();