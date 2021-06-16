const repair_structures: Map<any, boolean> = new Map(
    [
        [STRUCTURE_WALL, true],
        [STRUCTURE_ROAD, true],
        [STRUCTURE_EXTENSION, true],
        [STRUCTURE_RAMPART, true],
        [STRUCTURE_SPAWN, true]
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
                        structure.hits / structure.hitsMax * 100 < 100 && repair_structures.has(structure.structureType)
                    );
                }
            })

            for (let i = 0; i < structures.length; i++) {
                const structure: Structure = structures[i];
                if (structure.structureType == STRUCTURE_WALL) {
                    // @ts-ignore
                    if (structure.hits / structure.hitsMax * 100 < 0.015) {
                        // @ts-ignore
                        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                            // @ts-ignore
                            creep.moveTo(structure);
                        }
                        return;
                    } else {
                        continue;
                    }
                } else if (structure.structureType == STRUCTURE_RAMPART) {
                    if (structure.hits / structure.hitsMax * 100 < 20) {
                        // @ts-ignore
                        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                            // @ts-ignore
                            creep.moveTo(structure);
                        }
                        return;
                    } else {
                        continue;
                    }
                } else {
                    // @ts-ignore
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        // @ts-ignore
                        creep.moveTo(structure);
                    }
                    return;
                }
            }
            // if we get here there is nothing to do
            creep.moveTo(Game.flags["construction_idle"]);
        } else {
            const sources = creep.room.find(FIND_SOURCES);
            if (sources.length > 1) {
                for (let i = 1; i < sources.length; i++) {
                    const source = sources[i];
                    if (source.energy > 50) {
                        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source);
                        }
                        break;
                    }
                }
            } else {
                if (sources[0].energy > 50) {
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
            }
        }
    },

    repair: 3,
    upkeep: function () {
        // @ts-ignore
        let cur_builders: number = 0;

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'repair') {
                cur_builders += 1;
            }
        }
        if (cur_builders < RoleRepair.repair) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], `screep_repair_${Game.time}`, {memory: {job: 'repair'}}) === 0) {
                console.log("spawning new repair");
            }
        }
    }
}

module.exports = RoleRepair;