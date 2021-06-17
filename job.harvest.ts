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
           const spawns = creep.room.find(FIND_MY_SPAWNS, {filter: (spawn) => {return (spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0);}});
           if (spawns.length > 0) {
               if (creep.transfer(spawns[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                   creep.moveTo(spawns[0]);
               }
           } else {
               const extensions = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType === STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);}});
               if (extensions.length > 0) {
                   if (creep.transfer(extensions[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                       creep.moveTo(extensions[0]);
                   }
               } else {
                   const storage = creep.room.find(FIND_STRUCTURES, {filter: (storage) => {return (storage.structureType === STRUCTURE_CONTAINER || storage.structureType === STRUCTURE_STORAGE && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0);}})
                   if (storage.length > 0) {
                       if (creep.transfer(storage[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                           creep.moveTo(extensions[0]);
                       }
                   } else {
                       creep.moveTo(Game.flags["harvester_idle"]);
                   }
               }
           }
        }
    },

    harvesters: 2,
    upkeep: async function () {
        if (utility.GetCreepsFromJob('harvest').length < this.harvesters) {
            await utility.SpawnCreep(config.main_room, [WORK,CARRY,MOVE], {collecting: true, job: 'harvest'});
        }
    }
}