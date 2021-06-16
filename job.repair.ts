const repair_structures: Map<any, boolean> = new Map(
    [
        [STRUCTURE_WALL, true],
        [STRUCTURE_ROAD, true],
        [STRUCTURE_EXTENSION, true],
        [STRUCTURE_RAMPART, true]
    ]);

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
                    return (
                        structure.hits / structure.hitsMax * 100 < 50 && repair_structures.has(structure.structureType)
                    );
                }
            })

            for (let i = 0; i < structures.length; i++) {
                const structure: Structure = structures[i];
                if (structure.structureType == STRUCTURE_WALL) {
                    // @ts-ignore
                    if (structure.hits / structure.hitsMax * 100 < 0.01) {
                        // @ts-ignore
                        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                            // @ts-ignore
                            creep.moveTo(structure);
                        }
                    } else {
                        continue;
                    }
                } else if (structure.structureType == STRUCTURE_RAMPART) {
                    if (structure.hits / structure.hitsMax * 100 < 10) {
                        // @ts-ignore
                        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                            // @ts-ignore
                            creep.moveTo(structure);
                        }
                    } else {
                        continue;
                    }
                } else {
                    // @ts-ignore
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        // @ts-ignore
                        creep.moveTo(structure);
                    }
                    break;
                }
            }
        } else {
            const sources = creep.room.find(FIND_SOURCES);
            for (let i = 0; i < sources.length; i++) {
                const source = sources[i];
                if (source.energy > 50) {
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                    break;
                }
            }
        }
    }
}

module.exports = RoleRepair;