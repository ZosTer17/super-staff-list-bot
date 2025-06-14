// import { Collection, ComponentType } from "discord.js";
// import { Manager } from "./Manager";
// import { Button } from "../models/Button";
// import { StringSelectMenu } from "../models/Menu";
// import { log } from "console";

// type Components = {
//     b: Button;
//     m: StringSelectMenu;
// };

// export class ComponentManager extends Manager<string, Button | StringSelectMenu> {
//     protected dir = "components";

//     public get buttons(): Collection<`b:${string}`, Button> {
//         return this.data.filter(c => c.data.type == ComponentType.Button) as Collection<`b:${string}`, Button>;
//     };

//     public get menus(): Collection<`m:${string}`, StringSelectMenu> {
//         return this.data.filter(c => c.data.type == ComponentType.StringSelect) as Collection<`m:${string}`, StringSelectMenu>;
//     };
// };