const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function (req, res) {
  let phone;
  if (!req.body.phone || !(phone = String(req.body.phone).replace(/[^\d]/g, ''))) {
    return res.status(422).send({error: 'You must provide a phone number'});
  }

  phone = '+' + phone;

  admin.auth().getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000);
      twilio.messages.create({
        body: 'Your code is ' + code,
        to: phone,
        from: '+17172971570'
      }, (err) => {
        if (err) {
          return res.status(422).send({error: err});
        }

        admin.database().ref('users/' + phone)
          .update({code: code, codeValid: true}, () => {
            res.send({success: true})
          })
      });
    })
    .catch(err => {
      res.status(422).send({error: err});
    });
};