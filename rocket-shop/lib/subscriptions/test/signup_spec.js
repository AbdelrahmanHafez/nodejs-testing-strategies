const assert = require('assert');
const MembershipApplication = require('../models/membership_application');

describe('Membership application requirements', () => {
  describe('Application valid if...', () => {
    let validApp;

    before(() => {
      validApp = new MembershipApplication({
        first: 'Abdelrahman',
        last: 'Hafez',
        email: 'a.hafez852@gmail.com',
        age: 24,
        height: 66,
        weight: 180
      });
    });

    it('all validators successful', () => {
      assert(validApp.isValid(), 'Not valid.');
    });
  });
  describe('Application invalid if...', () => {
    it('is expired', () => {
      const app = new MembershipApplication({ validUntil: '2018/10/18' });
      assert(app.expired(), 'has not expired');
    });
    it('email is 3 characters or less', () => {
      const app = new MembershipApplication({ email: 'a@b' });
      assert(!app.emailIsValid(), 'Valid');
    });
    it('email does not contain an @', () => {
      const app = new MembershipApplication({ email: 'hafez_gmail.com' });
      assert(!app.emailIsValid(), 'Valid');
    });
    it('email is ommitted', () => {
      const app = new MembershipApplication();
      assert(!app.emailIsValid(), 'Valid');
    });
    it('height is less than 60 inches', () => {
      const app = new MembershipApplication({ height: 55 });
      assert(!app.heightIsValid(), 'Valid');
    });
    it('height is more than 75 inches', () => {
      const app = new MembershipApplication({ height: 80 });
      assert(!app.heightIsValid(), 'Valid');
    });
    it('height is ommitted', () => {
      const app = new MembershipApplication();
      assert(!app.heightIsValid(), 'Valid');
    });
    it('age is less than 15', () => {
      const app = new MembershipApplication({ age: 10 });
      assert(!app.ageIsValid(), 'Valid');
    });
    it('age is more than 100', () => {
      const app = new MembershipApplication({ age: 120 });
      assert(!app.ageIsValid(), 'Valid');
    });
    it('age is ommitted', () => {
      const app = new MembershipApplication();
      assert(!app.ageIsValid(), 'Valid');
    });
    it('weight is less than 100', () => {
      const app = new MembershipApplication({ weight: 90 });
      assert(!app.weightIsValid(), 'Valid');
    });
    it('weight is more than 300', () => {
      const app = new MembershipApplication({ weight: 350 });
      assert(!app.weightIsValid(), 'Valid');
    });
    it('weight is ommitted', () => {
      const app = new MembershipApplication();
      assert(!app.weightIsValid(), 'Valid');
    });
  });
});