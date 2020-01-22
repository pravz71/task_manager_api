const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = < Enter your api key >;
sgMail.setApiKey(sendGridAPIKey);
const msg = {
	to: 'pravingupta1071@gmailcom',
	from: 'pravingupta1071@gmailcom',
	subject: 'Test!',
	text: 'Testing sendGrid Emails'
}

sgMail.send(msg).catch(err => {
	console.log(err);
});

