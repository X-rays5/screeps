const builders = 3;

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
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], 'screep_' + Game.time, {memory: {job: 'builder'}}) === 0) {
                console.log("spawning new builder");
            }
        }
    }
}

module.exports = BuilderUpkeep;