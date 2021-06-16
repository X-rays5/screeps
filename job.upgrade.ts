var RoleUpgrade: any = {
    run: function(creep: Creep) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading) {
            // @ts-ignore
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                const {controller}: any = creep.room;
                creep.moveTo(controller);
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    },

    upgraders: 3,
    upkeep: function () {
        // @ts-ignore
        let cur_upgraders: number = 0;

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'upgrade') {
                cur_upgraders += 1;
            }
        }
        if (cur_upgraders < RoleUpgrade.upgraders) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], `screep_upgrade_${Game.time}`, {memory: {job: 'upgrade'}}) === 0) {
                console.log("spawning new upgrader");
            }
        }
    }
};

module.exports = RoleUpgrade;