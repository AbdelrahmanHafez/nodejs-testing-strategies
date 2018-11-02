const assert = require('assert');
const sinon = require('sinon');
const MissionControl = require('../models/mission_control');
const db = require('../db');

sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
sinon.stub(db, 'createNewMission').yields(null, new MissionControl({ db }));

const missionControl = new MissionControl({ db });

describe('Mission Control', () => {
  describe('Current mission exists', () => {
    let currentMission;
    before(function (done) {
      missionControl.currentMission(function (err, mission) {
        currentMission = mission;
        done();
      });
    });

    it('is created if none exist', function () {
      assert(currentMission);
      assert(db.getMissionByLaunchDate.called);
    });
  });

  describe('Current mission does not exist', () => {
    let currentMission;
    sinon.restore();
    sinon.stub(db, 'getMissionByLaunchDate').yields(null, { id: 1000 });
    before(function (done) {
      missionControl.currentMission(function (err, mission) {
        currentMission = mission;
        done();
      });
    });

    it('is created if none exist', function () {
      assert.equal(currentMission.id, 1000);
      assert(db.getMissionByLaunchDate.called);
    });
  });
});