import {
    Awaitable,
    DiscordAPIError,
    APIModalInteractionResponseCallbackData as ModalData,
    ModalSubmitInteraction
} from "discord.js";

export abstract class Modal {
    constructor(readonly data: ModalData) {};

    abstract run(interaction: ModalSubmitInteraction<"cached">): Awaitable<void>;
};