const upgraders = 3;
var UpgraderUpkeep = {
    run: function () {
        let cur_upgraders = 0;
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'upgrade') {
                cur_upgraders += 1;
            }
        }
        if (cur_upgraders < upgraders) {
            if (Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'screep_' + Game.time, { memory: { job: 'upgrade' } }) !== 0) {
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], 'screep_' + Game.time, { memory: { job: 'upgrade' } });
            }
        }
        console.log(cur_upgraders + ' upgraders');
    }
};
module.exports = UpgraderUpkeep;
