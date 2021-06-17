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
        ["carry", roleCarry]
    ])

let last_pretick_run = 0;

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

const AttackCreepById = function(room: string, id: string) {
    const target = Game.rooms[room].find(FIND_CREEPS, {
        filter: (creep) => {
            return (creep.id === id);
        }
    })
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.job === 'defend') {
            creep.memory.attacking = target[0];
        }
    }
}

const DefendRoom = function(room: string) {
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.job === 'defend') {
            creep.memory.defend_room = room;
        }
    }
}

const StopAttacking = function() {
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.job === 'defend') {
            // @ts-ignore
            creep.memory.attacking = 0;
        }
    }
}