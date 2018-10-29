const assert = require('assert');
const moment = require('moment');
const Mission = require('./mission');

class MissionControl {
  constructor (args) {
    assert(args.db, 'Needs a DB instance');
    this.db = args.db;
  }

  currentMission (next) {
    const nextMission = moment().add(1, 'month').startOf('month');
    const formattedMissionDate = nextMission.format('YYYY/MM/DD');
    const self = this;

    this.db.find({ launchDate: formattedMissionDate }, function (err, foundMission) {
      assert.ok(err === null, err);

      if (foundMission) return next(null, new Mission(foundMission));
      const newMission = new Mission();
      self.db.insert(newMission, function (err, result) {
        next(err, newMission);
      });
    });
  }

  hasSpaceForRole (role, next) {
    this.currentMission(function (err, mission) {
      const hasRoom = mission.needsRole(role);
      next(null, hasRoom);
    });
  }
}

module.exports = MissionControl;