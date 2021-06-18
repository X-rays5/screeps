const utility = require('utility');
const utility_tasks = require('utility.tasks');
const utility_jobs = require('utility.jobs');

let init = false;

module.exports.loop = function () {
    if (!init) {
        utility_tasks.RunEvery(30, utility.CleanMemory);
        utility_tasks.RunEvery(10, utility.SpawnQueueTick);
        utility_tasks.RunDelayed(10, () => {utility.SpawnQueueTick().catch()});
        //utility_tasks.RunEvery(10, utility_jobs.DoUpkeep);
        init = !init;
    }
    console.log(`--- start of tick ${Game.time} ---`);
    utility.TasksTick().catch((reason: any) => {
        console.log(`Tasks error ${reason}`);
    });
    utility_jobs.DoJobs().catch((reason: any) => {
        console.log(`Jobs error ${reason}`);
    });
    console.log(`--- end of tick ${Game.time} ---`);
}