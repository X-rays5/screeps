var RoleCarrier: any = {
    run: function (creep: Creep) {
        // @ts-ignore
        if(creep.memory.storing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.storing = false;
        }
        if(!creep.memory.storing && creep.store.getFreeCapacity() == 0) {
            creep.memory.storing = true;
        }

        if (creep.memory.storing) {
            const extension = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION && structure.energy !== structure.energyCapacity)
                }
            })
            if (extension.length > 0) {
                if (creep.transfer(extension[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(extension[0]);
                }
                return;
            } else {
                const containers = creep.room.find(FIND_STRUCTURES, {
                   filter: (structure) => {
                       return (structure.structureType === STRUCTURE_CONTAINER && structure.store.getUsedCapacity() !== structure.storeCapacity)
                   }
                });
                if (containers.length > 0) {
                    if (creep.transfer(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0]);
                    }
                    return;
                } else {
                    creep.moveTo(Game.flags["carrier_idle"]);
                }
            }
        } else {
            const tombstones = creep.room.find(FIND_TOMBSTONES, {
                filter: (tombstone) => {
                    return (tombstone.creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
                }
            });
            if (tombstones.length > 0) {
                if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(tombstones[0]);
                }
                return;
            } else {
                const extension = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION && structure.energy !== structure.energyCapacity)
                    }
                })
                if (extension.length > 0) {
                    const containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_CONTAINER && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
                        }
                    });
                    if (containers.length > 0) {
                        if (creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(containers[0]);
                        }
                    }
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
            if (Game.spawns['Spawn1'].spawnCreep([CARRY,MOVE], `screep_carrier_${Game.time}`, {memory: {job: 'carry'}}) === 0) {
                console.log("spawning new carry");
            }
        }
    }
}

module.exports = RoleCarrier;