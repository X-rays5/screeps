const JobHarvest = require('job.harvest');
const JobUpgrade = require('job.upgrader');

const job_handlers = new Map(
    [
        ["harvest", JobHarvest],
        ["upgrade", JobUpgrade]
    ])

module.exports = {
    DoJobs: async function() {
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (job_handlers.has(creep.memory.job)) {
                await job_handlers.get(creep.memory.job).run(creep);
            } else {
                console.log(`Unkown job ${creep.memory.job}`);
            }
        }
    },

    DoUpkeep: async function() {
        job_handlers.forEach((value, key) => {
            value.upkeep();
        })
    }
}