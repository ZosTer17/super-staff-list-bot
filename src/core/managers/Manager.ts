import { Collection } from "discord.js";
import { readdirSync, } from "fs";
import { join, resolve } from "path";
import { Base, InteractionsType } from "../../types/Interactions";
import client from "../..";

export type Properties<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

export interface IModule {
    readonly filePath: string;
};

export abstract class Manager<K, T extends InteractionsType, V = Base<T>> {
    public data = new Collection<K, V>();
    protected modules: V[] = [];
    
    constructor(protected dir: string) {};

    abstract loadAll(): void;

    protected async loadFiles(): Promise<V[]> {
        if (client.isReloading())
            this.clear();

        const fullPath = join(client.baseDir, this.dir);
        const items = readdirSync(fullPath, { recursive: true }) as string[];
        const modules = await Promise.all(
            items
                .filter(i => i.endsWith(".ts"))
                .map(async i => {
                    const absPath = resolve(fullPath, i);
                    const module: V = (await import(`file://${absPath}`))?.default;

                    this.modules.push(module);
                    return module;
                })
        );

        return modules;
    };

    private clear() {
        this.modules = [];
        this.data.clear();
    };
};