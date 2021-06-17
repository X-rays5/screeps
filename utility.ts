const tasks = require('utility.tasks');

module.exports = {
    CleanMemory: async function () {
        for(const name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log(`Cleanup cleared memory of ${name}`)
            }
        }
    },

    TasksTick: async function() {
        tasks.RunTasks();
        tasks.RunDelayedTasks();
    }
}