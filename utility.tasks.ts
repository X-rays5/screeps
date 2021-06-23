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
    DelayedTasks: new Array<DelayedTask>(),
    Tasks: new Array<Task>(),

    RunDelayed: async function (runin: number, cb: () => void) {
        runin += Game.time;
        this.DelayedTasks.push({runin, cb});
    },

    RunEvery: async function (runevery: number, cb: () => void) {
        let runin = runevery + Game.time;
        this.Tasks.push({runin, runevery, cb});
    },

    RunDelayedTasks: async function () {
        this.DelayedTasks.forEach((task: { runin: number; cb: () => void; }, index: number) => {
            if (task.runin === Game.time) {
                this.DelayedTasks.splice(index, 1);
                task.cb();
            }
        })
        await console.log("Executed all delayed tasks");
    },

    RunTasks: async function() {
        for (let i = 0; i < this.Tasks.length; i++) {
            const task = (this.Tasks)[i];
            if (task.runin === Game.time) {
                task.cb();
                task.runin = task.runevery + Game.time;
            }
        }
        await console.log("Executed all tasks");
    }
}