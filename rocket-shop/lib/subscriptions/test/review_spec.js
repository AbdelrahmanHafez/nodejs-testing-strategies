const assert = require('assert');
const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');

describe('The Review Process', () => {
  describe('Receiving a valid application', () => {
    let decision;
    let validApp;
    before((done) => {
      validApp = new MembershipApplication({
        first: 'Abdelrahman',
        last: 'Hafez',
        email: 'a.hafez852@gmail.com',
        age: 24,
        height: 66,
        weight: 180
      });

      const review = new ReviewProcess(validApp);
      review.processApplication(validApp, (err, result) => {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });
  });
});