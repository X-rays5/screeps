
module.exports = {
    CleanMemory: async function () {
        for(const name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log(`Cleanup cleared memory of ${name}`)
            }
        }
    },

    GetCreepsFromJob: function(job: string): Creep[] {
        let return_v: Creep[] = [];
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
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
        task.RunDelayedTasks();
    }
}