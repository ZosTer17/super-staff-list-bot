import { 
    ApplicationCommandOptionType,
    AutocompleteInteraction,
    Awaitable,
    ChatInputCommandInteraction,
    RESTPostAPIChatInputApplicationCommandsJSONBody as ChatInputData,
} from "discord.js";
import { IModule, Properties } from "../managers/Manager";

interface ICommand extends IModule {
    readonly data: ChatInputData;
    readonly cooldown?: number;
    run(interaction: ChatInputCommandInteraction<"cached">): Awaitable<void>;
};

export interface IAutocomplete {
    autocompleter(interaction: AutocompleteInteraction<"cached">): Awaitable<void>;
};

export abstract class SlashCommand implements ICommand {
    public readonly data: ChatInputData;
    public readonly autocomplete: boolean;
    public readonly filePath: string;
    public readonly cooldown = 3;

    constructor(readonly options: Properties<ICommand>) {
        const { data, filePath } = options;

        this.data = data;
        this.autocomplete = !data.options || data.options.some(o => o.type == ApplicationCommandOptionType.String && o.autocomplete);
        this.filePath = filePath;
    };

    abstract run(interaction: ChatInputCommandInteraction<"cached">): Awaitable<void>;

    public isAutocomplete(): this is IAutocomplete {    
        return this.autocomplete;
    };
};