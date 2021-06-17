const tasks = require('utility.tasks');

module.exports = {

    TasksTick: async function() {
        tasks.RunTasks();
        tasks.RunDelayedTasks();
    }
}