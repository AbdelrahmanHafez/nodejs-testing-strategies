const assert = require('assert');
const async = require('async');
const MissionControl = require('../models/mission_control');
class ReviewProcess {
  constructor (args) {
    assert(args.app, 'Needs an application to review.');
    this.callback = null;
    this.app = args.app;
    this.db = args.db;
    this.missionControl = new MissionControl({ db: this.db });
  }

  validateApp (next) {
    if (this.app.isValid()) next(null, true);
    else next(this.app.getValidationMesage(), null);
  }

  findNextMission (next) {
    const mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: []
    };
    next(null, mission);
  }

  roleIsAvailable (next) {
    next(null, true);
  }

  ensureRoleCompatible (next) {
    next(null, true);
  }

  approveApplication (next) {
    next(null, true);
  }

  processApplication (next) {
    const self = this;
    async.series({
      validated: this.validateApp.bind(self),
      mission: this.findNextMission.bind(self),
      roleAvailable: this.roleIsAvailable.bind(self),
      roleCompatible: this.ensureRoleCompatible.bind(self),
      success: this.approveApplication.bind(self)
    }, function (err, result) {
      if (err) return next(null, { success: false, message: err });
      next(null, result);
    });
  }
}

module.exports = ReviewProcess;