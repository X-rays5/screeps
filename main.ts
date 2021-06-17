const utility = require('utility');
const utility_tasks = require('utility.tasks');

let init = false;

module.exports.loop = function () {
    if (!init) {
        init = !init;
    }
    console.log(`--- start of tick ${Game.time} ---`);
    utility.TasksTick();


    console.log(`--- end of tick ${Game.time} ---`);
}