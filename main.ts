// pretick
var CleanUp = require('pretick.cleanup');
var HarvesterUpkeep = require('pretick.harvester_upkeep');
var UpgraderUpkeep = require('pretick.upgrader_upkeep');
var BuilderUpkeep = require('pretick.builder_upkeep');

// jobs
var roleHarvester = require('job.harvest');
var roleUpgrader = require('job.upgrade');
var roleBuilder = require('job.builder');

module.exports.loop = function () {
    console.log(`----- tick: ${Game.time} start -----`);
    CleanUp.run();
    HarvesterUpkeep.run();
    UpgraderUpkeep.run();
    BuilderUpkeep.run();


    if(Game.spawns['Spawn1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        // @ts-ignore
        Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.job, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, {align: 'left', opacity: 0.8});
    }

    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        // @ts-ignore
        if(creep.memory.job == 'harvest') {
            roleHarvester.run(creep);
        }
        // @ts-ignore
        if(creep.memory.job == 'upgrade') {
            roleUpgrader.run(creep);
        }
        // @ts-ignore
        if(creep.memory.job == 'builder') {
            roleBuilder.run(creep);
        }
    }
    console.log(`----- tick: ${Game.time} end -----`);
}