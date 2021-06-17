interface DelayedTask {
    runin: number;
    cb: () => void;
}

interface Task {
    runin: number;
    runevery: number;
    cb: () => void;
}

module.exports = {
    DelayedTasks: [],
    Tasks: [],

    RunDelayed: async function (runin: number, cb: () => void) {
        runin += Game.time;
        this.DelayedTasks.push({runin, cb});
    },

    RunEvery: async function (runevery: number, cb: () => void) {
        let runin = runevery + Game.time;
        this.Tasks.push({runin, runevery, cb});
    },

    RunDelayedTasks: async function () {
        for (let i = 0; i < this.DelayedTasks.length; i++) {
            const task = (this.DelayedTasks)[i];
            if (task.runin === Game.time) {
                this.DelayedTasks.splice(i, 1);
                task.cb();
            }
        }
    },

    RunTasks: async function() {
        for (let i = 0; i < this.Tasks.length; i++) {
            const task = (this.Tasks)[i];
            if (task.runin === Game.time) {
                task.cb();
                task.runin = task.runevery + Game.time;
            }
        }
    }
}