const assert = require('assert');
const sinon = require('sinon');
const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');

describe('The Review Process', () => {
  describe('Receiving a valid application', () => {
    let decision;
    const validApp = new MembershipApplication({
      first: 'Abdelrahman',
      last: 'Hafez',
      email: 'a.hafez852@gmail.com',
      age: 24,
      height: 66,
      weight: 180
    });
    const review = new ReviewProcess(validApp);
    const spy = sinon.spy();
    before((done) => {
      review.on('validated', spy);
      review.processApplication(validApp, (err, result) => {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });

    it('validates app', () => {
      assert(spy.called);
    });
  });
});