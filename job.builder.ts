var harvester = require('job.harvest')

var roleBuilder: any = {
    run: function(creep: Creep) {
        // @ts-ignore
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                // no build jobs so help the harvesters
                harvester.run(creep);
            }
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

    builders: 2,
    upkeep: function () {
        // @ts-ignore
        let cur_builders: number = 0;

        for(const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.job == 'builder') {
                cur_builders += 1;
            }
        }
        if (cur_builders < roleBuilder.builders) {
            // @ts-ignore
            // only log on success
            if (Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], `screep_builder_${Game.time}`, {memory: {job: 'builder'}}) === 0) {
                console.log("spawning new builder");
            }
        }
    }
};

module.exports = roleBuilder;