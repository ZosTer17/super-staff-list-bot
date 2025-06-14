const { ShardingManager } = require('discord.js');
const { token } = require('./config.json');
const manager = new ShardingManager('./index.js', {
    token: token,
    totalShards: 'auto',
});

manager.on('shardCreate', (shard) => {
    console.log(`Shard numero [${shard.id}]`)
});

manager.spawn();