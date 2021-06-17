module.exports = {
    run: async function (creep: Creep) {
        if (creep.memory.collecting && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            const sources = utility.GetSources(creep.room.name);
            if (sources.length > 0) {
                if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            } else {
                creep.moveTo(Game.flags["harvester_idle"]);
            }
        } else {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
                creep.memory.collecting = true;
                return;
            } else {
                creep.memory.collecting = false;
            }
            const {controller}: any = creep.room;
            if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        }
    },

    upgraders: 1,
    upkeep: async function () {
        if (utility.GetCreepsFromJob('upgrade').length < this.upgraders) {
            await utility.SpawnCreep(config.main_room, [WORK,CARRY,MOVE], {collecting: true, job: 'upgrade'});
        }
    }
}