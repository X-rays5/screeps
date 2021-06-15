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

    for (const name in Game.spawns) {
        const spawn = Game.spawns[name];
        if (spawn.spawning) {
            // @ts-ignore
            const spawningCreep = Game.creeps[spawn.spawning.name];
            // @ts-ignore
            spawn.room.visual.text('🛠️' + spawningCreep.memory.job, spawn.pos.x + 1, spawn.pos.y, {align: 'left', opacity: 0.8});
        }
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