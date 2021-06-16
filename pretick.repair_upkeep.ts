const repair = 4;

var RepairUpkeep: any = {
    run: function () {
        // @ts-ignore
        let cur_builders: number = 0;

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'repair') {
                cur_builders += 1;
            }
        }
        if (cur_builders < repair) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], `screep_repair_${Game.time}`, {memory: {job: 'repair'}}) === 0) {
                console.log("spawning new repair");
            }
        }
    }
}

module.exports = RepairUpkeep;