import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { Base, InteractionsType } from "../../types/Interactions";

class Ping extends Base<InteractionsType.ChatInput> {
    constructor() {
        super({
            data: new SlashCommandBuilder()
                .setName("ping")
                .setDescription("pong"),
            cooldown: 5
        })  
    };

    public async execute(interaction: ChatInputCommandInteraction) {
        
    };
};

export default new Ping();