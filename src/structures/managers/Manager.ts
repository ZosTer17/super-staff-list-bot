import { Collection } from "discord.js";
import { readdirSync, statSync } from "fs";
import { pathToFileURL } from "url";
import { join, resolve } from "path";
import client from "../..";
import { SlashCommand } from "../models/Command";
// import { Event } from "../models/Event";

export type Properties<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

export interface IModule {
    readonly filePath: string;
};

export abstract class Manager<K, V, /** R = V extends Collection<K, infer U> ? U : V */> {
    public data = new Collection<K, V>();
    protected modules: V[] = [];
    protected dir?: string;

    abstract loadAll(): void;

    protected async loadFiles(dir: string): Promise<V[]> {
        if (client.isReloading())
            this.clear();

        const fullPath = join(client.baseDir, dir);
        const items = readdirSync(fullPath, { recursive: true }) as string[]
        const modules = await Promise.all(
            items
                .filter(i => i.endsWith(".ts"))
                .map(async i => {
                    const absPath = resolve(fullPath, i);
                    const module = (await import(`file://${absPath}`))?.default;

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