const builders = 2;

var BuilderUpkeep: any = {
    run: function () {
        // @ts-ignore
        let cur_builders: number = 0;

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'builder') {
                cur_builders += 1;
            }
        }
        if (cur_builders < builders) {
            // @ts-ignore
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'screep_' + Game.time, {memory: {job: 'builder'}});
        }
        console.log(cur_builders + ' builders');
    }
}

module.exports = BuilderUpkeep;