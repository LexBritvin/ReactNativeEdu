const twilio = require('twilio');
const twilioSettings = require('./twilio_account.json');

module.exports = new twilio.Twilio(twilioSettings.accountSid, twilioSettings.authToken);