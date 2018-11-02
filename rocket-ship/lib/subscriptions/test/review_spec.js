const assert = require('assert');
const sinon = require('sinon');
const ReviewProcess = require('../processes/review');
const Helper = require('./helpers/index');
const db = require('../db');

describe('The Review Process', () => {
  describe('Receiving a valid application', () => {
    let decision;
    const validApp = Helper.validApplication;
    const review = new ReviewProcess({ app: validApp, db });

    sinon.spy(review, 'validateApp');
    sinon.spy(review, 'findNextMission');
    sinon.spy(review, 'roleIsAvailable');
    sinon.spy(review, 'ensureRoleCompatible');
    sinon.spy(review, 'processApplication');

    before((done) => {
      review.processApplication((err, result) => {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });

    it('validates app', () => {
      assert(review.validateApp.called);
    });

    it('finds next mission', () => {
      assert(review.validateApp.called);
    });

    it('verifies if role is available', () => {
      assert(review.roleIsAvailable.called);
    });

    it('ensures role compatibility', () => {
      assert(review.ensureRoleCompatible.called);
    });
  });
});