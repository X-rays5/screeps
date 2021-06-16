var CleanMemory = {
    run: function () {
        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log(`Cleanup cleared memory of ${name}`);
            }
        }
    }
};
module.exports = CleanMemory;
