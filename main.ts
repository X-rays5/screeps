// pretick
var CleanUp = require('pretick.cleanup');

// jobs
var roleHarvester = require('job.harvest');
var roleUpgrader = require('job.upgrade');
var roleBuilder = require('job.builder');
var roleRepair = require('job.repair');
var roleHeal = require('job.heal');
var roleDefend = require('job.defend');
var roleCarry = require('job.carrier');

const job_handlers: Map<string, any> = new Map(
    [
        ["harvest", roleHarvester],
        ["upgrade", roleUpgrader],
        ["builder", roleBuilder],
        ["repair", roleRepair],
        ["heal", roleHeal],
        ["defend", roleDefend],
       // ["carry", roleCarry]
    ])

let last_pretick_run = 0;
let last_spawn_notify_prod = 0;

module.exports.loop = function () {
    console.log(`----- tick: ${Game.time} start -----`);
    if (Game.time - last_pretick_run >= 10) {
        console.log("running pretick jobs");
        for (const name in Game.rooms) {
            Game.rooms[name].memory.heal_targets = [];
        }
        CleanUp.run();
        job_handlers.forEach((value, key) => {value.upkeep();});
        last_pretick_run = Game.time
    }

    if (Game.time - last_spawn_notify_prod > 5) {
        for (const name in Game.spawns) {
            const spawn = Game.spawns[name];
            if (spawn.spawning) {
                // @ts-ignore
                const spawningCreep = Game.creeps[spawn.spawning.name];
                spawn.memory.lastspawned = spawningCreep.memory.job
            }
        }
        last_spawn_notify_prod = Game.time;
    }

    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.hits < creep.hitsMax) {
            creep.room.memory.heal_targets.push(creep);
        }

        if (job_handlers.has(creep.memory.job)) {
            job_handlers.get(creep.memory.job).run(creep);
        } else {
            console.log(`${name} has a unkown job`);
        }
    }
    console.log(`----- tick: ${Game.time} end -----`);
}