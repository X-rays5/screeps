var RoleRepair: any = {
    run: function (creep: Creep) {
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if (creep.memory.repairing) {
            const structures: Structure[] = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL && structure.hits / structure.hitsMax * 100 < 0.01);
                }
            })

            for (const structure in structures) {
                // @ts-ignore
                if (structure.structureType == STRUCTURE_WALL) {
                    // @ts-ignore
                    if (structure.hits / structure.hitsMax * 100 < 0.01) {
                        // @ts-ignore
                        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                            // @ts-ignore
                            creep.moveTo(structure.pos);
                        }
                    } else {
                        continue;
                    }
                } else {
                    // @ts-ignore
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        // @ts-ignore
                        creep.moveTo(structure.pos);
                    }
                }
            }
        } else {
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}

module.exports = RoleRepair;