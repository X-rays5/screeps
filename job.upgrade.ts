var roleUpgrader: any = {

    /** @param {Creep} creep **/
    run: function(creep: Creep) {
        if(creep.store[RESOURCE_ENERGY] == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            // @ts-ignore
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                const {controller}: any = creep.room;
                creep.moveTo(controller);
            }
        }
    }
};

module.exports = roleUpgrader;