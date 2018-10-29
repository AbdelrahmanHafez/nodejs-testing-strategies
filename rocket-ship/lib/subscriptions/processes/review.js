const { EventEmitter } = require('events');
const util = require('util');

class ReviewProcess extends EventEmitter {
  constructor (...args) {
    super(...args);
    this.callback = null;
    this.on('application-received', this.validateApp);
    this.on('validated', this.findNextMission);
    this.on('mission-selected', this.roleIsAvailable);
    this.on('role-available', this.ensureRoleCompatible);
    this.on('role-compatible', this.acceptApplication);
    this.on('invalid', this.denyApplication);
  }

  validateApp (app) {
    console.log('runs');
    if (app.isValid()) this.emit('validated', app);
    else this.emit('invalid', app.getValidationMesage());
  }

  findNextMission (app) {
    app.mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: []
    };
    this.emit('mission-selected', app);
  }

  roleIsAvailable (app) {
    this.emit('role-available', app);
  }

  ensureRoleCompatible (app) {
    this.emit('role-compatible', app);
  }

  acceptApplication (app) {
    this.callback(null, {
      success: true,
      message: 'Welcome to the Mars Program!'
    });
  }

  denyApplication (message) {
    this.callback(null, { success: false, message });
  }

  processApplication (app, next) {
    this.callback = next;
    this.emit('application-received', app);
  }
}

module.exports = ReviewProcess;