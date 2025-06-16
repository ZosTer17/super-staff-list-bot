import { Events, Interaction, InteractionType, MessageFlags } from "discord.js";
import { Event } from "../../core/structures/Event";
import client from "../..";
import { Base } from "../../types/Interactions";

class InteractionCreate extends Event<Events.InteractionCreate> {
    constructor() {
        super({
            name: Events.InteractionCreate
        });
    };

    public async execute(interaction: Interaction<"cached">) {
        const { type, member } = interaction;

        switch (type) {
            case InteractionType.ApplicationCommand: {
                const command = client.commandManager.data.get(interaction.commandName);
                
                if (!command)
                    return;

                try {
                    await command.execute(interaction);
                } catch (err) {
                    if (err instanceof Error)
                        console.error(err);
                        
                    if (!interaction.replied || !interaction.deferred) {
                        await interaction.reply({
                            content: "C'è stato un errore durante l'esecuzione del comando",
                            flags: MessageFlags.Ephemeral
                        });
                    } else {
                        await interaction.followUp({
                            content: "C'è stato un errore durante l'esecuzione del comando",
                            flags: MessageFlags.Ephemeral
                        });
                    };
                };
            };
            break;
            case InteractionType.MessageComponent: {
                const component = client.componentManager.data.get(1);
                
                if (!component)
                    return;

                await component.execute(interaction);
            };
            break;
            // case InteractionType.ApplicationCommandAutocomplete: {
            //     const command = client.commands.get(interaction.commandName) as SlashCommand;

            //     if (!command || !command.isAutocomplete())
            //         return;

            //     await command.autocompleter(interaction);
            // };
            // break;
            // case InteractionType.ModalSubmit: {
            //     const modal = client.modals.find(k => interaction.customId.startsWith(k.data.custom_id)); 
            //     await modal?.run(interaction);
            // };
            // break;
        };
    };

    private isInCooldown(interaction: Interaction, cooldown: number) {
        const { cooldowns } = client;

    };

    // private onCooldown(data: { cooldown: number, commandName: string, memberId: string }) {
    //     const { cooldowns } = client;
    //     const { cooldown, commandName, memberId } = data;

    //     if (!cooldowns.has(commandName))
    //         cooldowns.set(commandName, new Collection<string, number>());

    //     const now = Date.now();

    // };
};

export default new InteractionCreate();