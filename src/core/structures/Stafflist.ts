export class Stafflist {
    public channelId!: string;
    public roles!: string[];

    public setChannelId(channelId: string) {
        this.channelId = channelId;
        return this;
    };

    public setRoles(roles: string[]) {
        this.roles = roles;
        return this;
    };
};