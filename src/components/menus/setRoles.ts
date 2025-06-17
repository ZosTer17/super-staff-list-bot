import { CacheType, RoleSelectMenuBuilder, RoleSelectMenuInteraction } from "discord.js";
import { Component, ComponentType } from "../../core/structures/Component";

export class SetRolesMenu extends Component<ComponentType.RoleSelect> {
    readonly type = ComponentType.RoleSelect;

    constructor() {
        super({
            data: new RoleSelectMenuBuilder()
                .setCustomId("setRoles")
                .setPlaceholder("Seleziona dei ruoli")
                .setMinValues(1)
                .setMaxValues(20)
        });
    };

    public async execute(interaction: RoleSelectMenuInteraction<CacheType>): Promise<void> {
        const { values } = interaction;

        
    };
};

export default new SetRolesMenu();