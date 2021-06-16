var RoleCarrier: any = {
    run: function (creep: Creep) {
        if(!creep.memory.drop_off && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            const tombstones = creep.room.find(FIND_TOMBSTONES, {
                filter: (structure) => {
                    return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
                }
            })
            if (tombstones.length > 0) {
                if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(tombstones[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            } else {
                const ruins = creep.room.find(FIND_RUINS, {
                    filter: (ruin) => {
                        return (ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                    }
                })
                if (ruins.length > 0) {
                    if (creep.withdraw(ruins[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(ruins[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    const dropped_energy = creep.room.find(FIND_DROPPED_RESOURCES, {
                        filter: (resource) => {
                            return (resource.resourceType === RESOURCE_ENERGY)
                        }
                    })
                    if (dropped_energy.length > 0) {
                        if (creep.pickup(dropped_energy[0]) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(dropped_energy[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                        return;
                    } else {
                        const extensions = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType === STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                            }
                        })
                        if (extensions.length > 0) {
                            const containers = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType === STRUCTURE_CONTAINER && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                                }
                            })
                            if (containers.length > 0) {
                                if (creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                                }
                                return;
                            } else {
                                creep.moveTo(Game.flags["carrier_idle"], {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }
                }
            }
        } else {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
                creep.memory.drop_off = false;
            } else {
                creep.memory.drop_off = true;
            }
            const extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            })

            if (extensions.length > 0) {
                if (creep.transfer(extensions[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(extensions[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            } else {
                const containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY)> 0);
                    }
                })
                if (containers.length > 0) {
                    if (creep.transfer(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    return;
                } else {
                    creep.moveTo(Game.flags["carrier_idle"]);
                }
            }
        }
    },

    carriers: 1,
    upkeep: function () {
        // @ts-ignore
        let cur_carriers: number = 0;

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'carry') {
                cur_carriers += 1;
            }
        }
        if (cur_carriers < RoleCarrier.carriers) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,MOVE,MOVE], `screep_carrier_${Game.time}`, {memory: {job: 'carry'}}) === 0) {
                console.log("spawning new carry");
            }
        }
    }
}

module.exports = RoleCarrier;