import { PermissionResolvable } from "discord.js";
import { CommandType } from "./Command";
import { ComponentType } from "./Component";

export interface IData {
    cooldown?: number;
    isDev?: boolean;
    botPermissions?: PermissionResolvable[];
    memberPermissions?: PermissionResolvable[];
};

export abstract class Base implements IData {
    abstract readonly type: CommandType | ComponentType;
    public cooldown?: number;
    public isDev?: boolean;
    public botPermissions?: PermissionResolvable[];
    public memberPermissions?: PermissionResolvable[];

    constructor(options: IData) {
        const { cooldown, isDev, botPermissions, memberPermissions } = options;

        this.cooldown = cooldown;
        this.isDev = isDev;
        this.botPermissions = botPermissions;
        this.memberPermissions = memberPermissions;
    };
};