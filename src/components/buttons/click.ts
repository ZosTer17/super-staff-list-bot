import { ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType } from "discord.js";
import { Component, InteractionsType } from "../../types/Interactions";

class Click extends Component<InteractionsType.Button> {
    readonly type = InteractionsType.Button;

    constructor() {
        super({
            data: new ButtonBuilder()
                .setCustomId("test")
                .setId(1)
                .setLabel("Clicca qui")
                .setStyle(ButtonStyle.Danger)
        });
    };

    public async execute(interaction: ButtonInteraction<"cached">) {
        await interaction.reply("ciao");
    };
};

export default new Click();