import { Collection } from "discord.js";
import { Component, ComponentType } from "../structures/Component";
import { Manager } from "./Manager";

type Components<K extends ComponentType> = Collection<string, Component<K>>;

export class ComponentManager<K extends ComponentType> extends Manager<K, Components<K>> {
    constructor() {
        super("components");

        Object.values(ComponentType).map(k => this.data.set(k as K, new Collection()));
    };

    public async loadAll() {
        const components = await this.loadFiles();

        for (const component of components) 
            this.data.get(component.type)?.set(component.getCustomId(), component);

        console.log(`Registrati in collection e caricati ${this.data.size} componenti`);
    };
};