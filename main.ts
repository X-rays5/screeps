const utility = require('utility');
const utility_tasks = require('utility.tasks');
const utility_jobs = require('utility.jobs');

module.exports.loop = function () {
    console.log(`--- start of tick ${Game.time} ---`);
    utility.TasksTick().catch((reason: any) => {
        console.log(`Tasks error ${reason}`);
    });
    utility_jobs.DoJobs().catch((reason: any) => {
        console.log(`Jobs error ${reason}`);
    });
    console.log(`--- end of tick ${Game.time} ---`);
}

// setup tasks
utility_tasks.RunEvery(1, utility.CleanMemory).catch((error: any) => {console.log(error);});
utility_tasks.RunEvery(1, utility.SpawnQueueTick).catch((error: any) => {console.log(error);});
utility_tasks.RunEvery(10, utility_jobs.DoUpkeep).catch((error: any) => {console.log(error);});