// pretick
var CleanUp = require('pretick.cleanup');
var HarvesterUpkeep = require('pretick.harvester_upkeep');
var UpgraderUpkeep = require('pretick.upgrader_upkeep');
var BuilderUpkeep = require('pretick.builder_upkeep');
var RepairUpkeep = require('pretick.repair_upkeep');

const upkeep_handlers: Map<string, any> = new Map(
    [
        ["harvest", HarvesterUpkeep],
        ["upgrade", UpgraderUpkeep],
        ["builder", BuilderUpkeep],
        ["repair", RepairUpkeep]
    ])

// jobs
var roleHarvester = require('job.harvest');
var roleUpgrader = require('job.upgrade');
var roleBuilder = require('job.builder');
var roleRepair = require('job.repair');

const job_handlers: Map<string, any> = new Map(
    [
        ["harvest", roleHarvester],
        ["upgrade", roleUpgrader],
        ["builder", roleBuilder],
        ["repair", roleRepair]
    ])

let last_pretick_run = 0;
let last_spawn_notify_prod = 0;

module.exports.loop = function () {
    console.log(`----- tick: ${Game.time} start -----`);
    if (Game.time - last_pretick_run >= 10) {
        CleanUp.run();
        upkeep_handlers.forEach((value, key) => {value.run();});
        last_pretick_run = Game.time
    }

    if (Game.time - last_spawn_notify_prod > 5) {
        for (const name in Game.spawns) {
            const spawn = Game.spawns[name];
            if (spawn.spawning) {
                // @ts-ignore
                const spawningCreep = Game.creeps[spawn.spawning.name];
                // @ts-ignore
                spawn.room.visual.text('🛠️' + spawningCreep.memory.job, spawn.pos.x + 1, spawn.pos.y, {align: 'left', opacity: 0.8});
            }
        }
        last_spawn_notify_prod = Game.time;
    }

    for(const name in Game.creeps) {
        const creep = Game.creeps[name];

        if (job_handlers.has(creep.memory.job)) {
            job_handlers.get(creep.memory.job).run(creep);
        } else {
            console.log(`${name} has a unkown job`);
        }
    }
    console.log(`----- tick: ${Game.time} end -----`);
}