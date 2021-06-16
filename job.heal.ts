var RoleHeal: any = {
    run: function (creep: Creep) {
        const targets = creep.room.memory.heal_targets;
        for (let i = 0; i < targets.length; i++) {
            if (targets[i].hits < targets[i].hitsMax) {
                if (creep.heal(targets[i]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[i], {visualizePathStyle: {stroke: '#2abf52'}})
                }
                return;
            }
        }
        creep.moveTo(Game.flags["healer_idle"])
    },

    healers: 1,
    upkeep: function () {
        // @ts-ignore
        let cur_healers: number = 0;

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'heal') {
                cur_healers += 1;
            }
        }
        if (cur_healers < RoleHeal.healers) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep([HEAL,MOVE], `screep_heal_${Game.time}`, {memory: {job: 'heal'}}) === 0) {
                console.log("spawning new healer");
            }
        }
    }
}

module.exports = RoleHeal;