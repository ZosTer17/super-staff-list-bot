import { ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType } from "discord.js";
import { Component, ComponentType } from "../../core/structures/Component";

class Click extends Component<ComponentType.Button> {
    readonly type = ComponentType.Button;

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