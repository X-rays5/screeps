const upgraders = 2;

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
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], 'screep_' + Game.time, {memory: {job: 'upgrade'}});
        }
        console.log(cur_upgraders + ' upgraders');
    }
}

module.exports = UpgraderUpkeep;