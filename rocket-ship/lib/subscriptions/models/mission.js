const moment = require('moment');
const assert = require('assert');

class Mission {
  constructor (args = {}) {
    this.status = 'open';
    this.commander = args.commander;
    this.MAVpilot = args.MAVPilot;
    this.colonists = args.colonists || [];
    this.tourists = args.tourists || [];
    this.launchDate = args.launchDate || moment().add(1, 'month').startOf('month').format('YYYY/MM/DD');
  }

  needsRole (role) {
    let needed = false;
    if (!this.isFlying()) return false;

    switch (role) {
      case 'mission-commander':
        needed = !this.commander;
        break;
      case 'mav-pilot':
        needed = !this.MAVpilot;
        break;
      case 'colonist':
        needed = this.colonists.length <= 10;
        break;
      case 'space-tourist':
        needed = this.tourists.length <= 20;
      default:
        break;
    }

    return needed;
  }

  assignRole (args) {
    const { role, user } = args;
    assert.ok(user && role, 'Needs a user and a role in order to assign.');

    switch (role) {
      case 'mission-commander':
        this.commander = user;
        break;
      case 'mav-pilot':
        this.MAVpilot = user;
        break;
      case 'colonist':
        this.colonists.push(user);
        break;
      case 'space-tourist':
        this.tourists.push(user);
    }

    return this;
  }

  isFlying () {
    return this.status === 'open';
  }
}

module.exports = Mission;