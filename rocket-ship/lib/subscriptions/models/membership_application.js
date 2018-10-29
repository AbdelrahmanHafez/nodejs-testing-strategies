const moment = require('moment');

class MembershipApplication {
  constructor (args = {}) {
    Object.assign(this, args);

    this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, 'days');
  }

  getValidationMessge () {
    if (this.isValid) return 'Application is valid.';
    else if (!this.nameIsValid()) return 'Name is invalid.';
    else if (!this.ageIsValid()) return 'Age is invalid.';
    else if (!this.emailIsValid()) return 'Email is invalid.';
    else if (!this.heightIsValid()) return 'Height is invalid.';
    else if (!this.weightIsValid()) return 'Weight is invalid.';
    else if (this.expired()) return 'application has expired.';
  }

  isValid () {
    return this.nameIsValid() &&
    this.ageIsValid() &&
    this.emailIsValid() &&
    this.heightIsValid() &&
    this.weightIsValid() &&
    !this.expired();
  }

  expired () {
    return this.validUntil.isBefore(moment());
  }

  nameIsValid () {
    return this.first && this.last;
  }

  ageIsValid () {
    return this.age && this.age < 100 && this.age > 15;
  }

  emailIsValid () {
    return this.email && this.email.length > 3 && this.email.includes('@');
  }

  heightIsValid () {
    return this.height && this.height > 60 && this.height < 75;
  }

  weightIsValid () {
    return this.weight && this.weight > 100 && this.weight < 300;
  }
}

module.exports = MembershipApplication;