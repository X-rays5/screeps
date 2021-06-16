var RoleDefender: any = {
    run: function (creep: Creep) {
        const non_friendly_creeps = creep.room.find(FIND_HOSTILE_CREEPS);

        if (non_friendly_creeps.length > 0) {
            if (creep.attack(non_friendly_creeps[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(non_friendly_creeps[0], {visualizePathStyle: {stroke: '#d91818'}});
            }
            creep.say("⚔ defending");
        } else {
            creep.moveTo(Game.flags["harvester_idle"]);
        }
    },

    defenders: 2,
    upkeep: function () {
        // @ts-ignore
        let cur_healers: number = 0;

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'defend') {
                cur_healers += 1;
            }
        }
        if (cur_healers < RoleDefender.defenders) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,TOUGH,TOUGH,TOUGH,MOVE,MOVE], `screep_defender_${Game.time}`, {memory: {job: 'defend'}}) === 0) {
                console.log("spawning new defender");
            }
        }
    }
}

module.exports = RoleDefender;