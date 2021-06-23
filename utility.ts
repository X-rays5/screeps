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
        for (const name in Game.spawns) {
            const spawn: StructureSpawn = Game.spawns[name];
            const queue: SpawnQueueItem[] = spawn.memory.spawn_queue;

            if (queue.length > 0) {
                spawn.spawnCreep(queue[0].BodyParts, `${Game.time}_${queue[0].memory.job}`, {memory: queue[0].memory});
                console.log(`Spawning ${Game.time}_${queue[0].memory.job}`);
            }
        }
    },

    SpawnCreep: async function(room: string, BodyParts: BodyPartConstant[], memory: CreepMemory) {
        for (const name in Game.spawns) {
            if (Game.spawns[name].room.name === room) {
                const spawn = Game.spawns[name];
                spawn.memory.spawn_queue.push({BodyParts, memory});
                console.log(`Added creep to spawn list\n Room: ${room}, BodyParts: ${BodyParts}, Job: ${memory.job}`);
                break;
            }
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