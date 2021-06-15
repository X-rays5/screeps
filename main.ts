var roleHarvester = require('job.harvest');
var roleUpgrader = require('job.upgrade');
var roleBuilder = require('job.builder');
var CleanUp = require('pretick.cleanup');

module.exports.loop = function () {
    CleanUp.run();

    // @ts-ignore
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.job == 'harvest');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        const newName = 'screep_' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        // @ts-ignore
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {job: 'harvest'}});
    }

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
}