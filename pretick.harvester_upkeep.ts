var HarvesterUpkeep: any = {
    run: function () {
        const small_harvesters = 1;
        const big_harvesters = 2;
        const small_name = 'small';
        const big_name = 'big';

        // @ts-ignore
        let big: number = 0;
        let small: number = 0;

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'harvest') {
                switch (creep.memory.type) {
                    case small_name:
                        small += 1;
                        break;
                    case big_name:
                        big += 1;
                        break;
                }
            }
        }
        if (small < small_harvesters) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], `screep_small_harvest_${Game.time}`, {memory: {job: 'harvest', type: small_name}}) === 0) {
                console.log("spawning new small harvester");
            }
        }
        if (big < big_harvesters) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], `screep_big_harvest_${Game.time}`, { memory: { job: 'harvest', type: big_name} } ) === 0) {
                console.log("spawning new big harvester");
            }
        }
    }
}

module.exports = HarvesterUpkeep;