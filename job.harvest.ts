var roleHarvester: any = {

    /** @param {Creep} creep **/
    run: function(creep: Creep) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES, {
                filter: (source) => {
                    return (source.energy > 50);
                }
                });
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            const targets: AnyStructure[] = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: Structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });


            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // make sure they are not blocking the resource collection
                creep.moveTo(Game.flags["harvester_idle"]);
                /*const target: AnyStructure[] = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure: Structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN);
                    }
                });
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }*/
            }
        }
    }
};

module.exports = roleHarvester;