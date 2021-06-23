interface SpawnQueueItem {
    BodyParts: BodyPartConstant[],
    memory: CreepMemory,
}

module.exports = {
    CleanMemory: async function () {
        for(const name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log(`Cleanup cleared memory of ${name}`)
            }
        }
    },


    SpawnQueueTick: async function() {
        console.log("spawn tick");
        for (const room in Game.rooms) {
            const spawns = Game.rooms[room].find(FIND_MY_SPAWNS, {
                filter: (spawn) => {
                    return (spawn.memory.spawn_queue.length > 0);
                }
            });

            if (spawns.length > 0) {
                const creep = spawns[0].memory.spawn_queue;
                spawns[0].spawnCreep(creep[0].BodyParts, `${Game.time}_${creep[0].memory.job}`, {memory: creep[0].memory});
                console.log(`Spawning ${Game.time}_${creep[0].memory.job}`);
            }
        }
    },

    SpawnCreep: async function(room: string, BodyParts: BodyPartConstant[], memory: CreepMemory) {
        const spawns = Game.rooms[room].find(FIND_MY_SPAWNS);
        if (spawns.length > 0) {
            const spawn = spawns[0];
            console.log(spawn);
            spawn.memory.spawn_queue.push({BodyParts, memory});
            console.log(`Added creep to spawn list\n Room: ${room}, BodyParts: ${BodyParts}, Job: ${memory.job}`);
        }
    },

    GetCreepsFromJob: function(job: string): Creep[] {
        let return_v: Creep[] = [];
        for (const name in Game.creeps) {
            const creep: Creep = Game.creeps[name];
            if (creep.memory.job === job) {
                return_v.push(creep);
            }
        }
        return return_v;
    },

    GetSources: function(room: string): Source[] {
        return Game.rooms[room].find(FIND_SOURCES, {
            filter: (source) => {
                return (source.energy > 0);
            }
        })
    },

    TasksTick: async function() {
        let task = require('utility.tasks')

        task.RunTasks();
        await task.RunDelayedTasks();
    }
}