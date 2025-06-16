import { Base, Component, ComponentType } from "../../types/Interactions";
import { Manager } from "./Manager";

// type Components = {
//     buttons: Component<InteractionsType.Button>;
//     menus: Component<InteractionsType.StringSelect>;
//     // modals: Component<InteractionsType.Modal>
// };

// type ComponentCollection<K extends keyof Components> = Collection<number, Components[K]>;

export class ComponentManager extends Manager<number, Component<ComponentType>> {
    constructor() {
        super("components");
    };

    public async loadAll() {
        const components = await this.loadFiles();

        for (const component of components) 
            this.data.set(component.getId(), component);

        console.log(`Registrati in collection e caricati ${this.data.size} componenti`);
    };
};