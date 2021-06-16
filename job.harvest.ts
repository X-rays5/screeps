var RoleHarvest: any = {
    run: function(creep: Creep) {
        if(!creep.memory.drop_off && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
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
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
                creep.memory.drop_off = false;
            } else {
                creep.memory.drop_off = true;
            }
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: Structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) || structure.structureType === STRUCTURE_CONTAINER;
                }
            });

            if(targets.length > 0) {
                for (let i = 0; i < targets.length; i++) {
                    if (targets[i].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        console.log(targets[i]);
                        if(creep.transfer(targets[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[i], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                        return;
                    }
                }
            } else {
                // make sure they are not blocking the resource collection
                creep.moveTo(Game.flags["harvester_idle"]);
            }
        }
    },

    small_harvesters: 1,
    big_harvesters: 3,
    small_name: 'small',
    big_name: 'big',
    upkeep: function () {
        // @ts-ignore
        let big: number = 0;
        let small: number = 0;

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'harvest') {
                switch (creep.memory.type) {
                    case RoleHarvest.small_name:
                        small += 1;
                        break;
                    case RoleHarvest.big_name:
                        big += 1;
                        break;
                }
            }
        }
        if (small < RoleHarvest.small_harvesters) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], `screep_small_harvest_${Game.time}`, {memory: {job: 'harvest', type: RoleHarvest.small_name}}) === 0) {
                console.log("spawning new small harvester");
            }
        }
        if (big < RoleHarvest.big_harvesters) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], `screep_big_harvest_${Game.time}`, { memory: { job: 'harvest', type: RoleHarvest.big_name} } ) === 0) {
                console.log("spawning new big harvester");
            }
        }
    }
};

module.exports = RoleHarvest;