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

    RunDelayedTasks: function () {
        this.DelayedTasks.forEach((task: { runin: number; cb: () => void; }, index: number) => {
            if (task.runin === Game.time) {
                //this.DelayedTasks.splice(index, 1);
                console.log("executing delayed task");
                task.cb()
            }
        })
    },

    RunTasks: function() {
        for (let i = 0; i < this.Tasks.length; i++) {
            const task = (this.Tasks)[i];
            if (task.runin === Game.time) {
                console.log("Executing task");
                task.cb();
                task.runin = task.runevery + Game.time;
            }
        }
    }
}