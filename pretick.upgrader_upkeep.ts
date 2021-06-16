const upgraders = 4;

var UpgraderUpkeep: any = {
    run: function () {
        // @ts-ignore
        let cur_upgraders: number = 0;

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'upgrade') {
                cur_upgraders += 1;
            }
        }
        if (cur_upgraders < upgraders) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], `screep_upgrade_${Game.time}`, {memory: {job: 'upgrade'}}) === 0) {
                console.log("spawning new upgrader");
            }
        }
    }
}

module.exports = UpgraderUpkeep;