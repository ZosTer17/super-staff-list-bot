import { CacheType, channelMention, ChannelSelectMenuBuilder, ChannelSelectMenuInteraction, ChannelType } from "discord.js";
import { Component, ComponentType } from "../../core/structures/Component";
import client from "../..";

export class SetChannelMenu extends Component<ComponentType.ChannelSelect> {
    readonly type = ComponentType.ChannelSelect;
    
    constructor() {
        super({
            data: new ChannelSelectMenuBuilder()
                .setCustomId("setChannel")
                .setPlaceholder("Seleziona un canale di invio")
                .setChannelTypes(ChannelType.GuildText)
        });
    };

    public async execute(interaction: ChannelSelectMenuInteraction<"cached">) {
        const { values, guildId } = interaction;
        const stafflist = client.stafflists.get(guildId);

        try {
            const channelId = values[0];
            // const embed = interaction.message.embeds[0].data;
            // Modifico il canale d'invio

            stafflist?.setChannelId(channelId);

            console.log("stafflists: ", client.stafflists);
            

            // await interaction.message.edit({
            //     embeds: [embed]
            // });
            
            await interaction.deferUpdate();
        } catch (error) {
            console.log(__filename, error);
        }  
    };
};

export default new SetChannelMenu();