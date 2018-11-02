const MembershipApplication = require('../../models/membership_application');

module.exports = {
  validApplication: new MembershipApplication({
    first: 'Abdelrahman',
    last: 'Hafez',
    email: 'a.hafez852@gmail.com',
    age: 24,
    height: 66,
    weight: 180
  })
};