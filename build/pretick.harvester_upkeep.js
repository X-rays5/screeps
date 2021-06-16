var HarvesterUpkeep = {
    run: function () {
        const small_harvesters = 2;
        const big_harvesters = 1;
        const small_name = 'small';
        const big_name = 'big';
        let big = 0;
        let small = 0;
        for (const name in Game.creeps) {
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
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'screep_' + Game.time, { memory: { job: 'harvest', type: small_name } });
        }
        if (big < big_harvesters) {
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], 'screep_' + Game.time, { memory: { job: 'harvest', type: big_name } });
        }
        console.log(small + ' small harvesters');
        console.log(big + ' big harvesters');
    }
};
module.exports = HarvesterUpkeep;
