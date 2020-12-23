const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const headers = {
    "Access-Control-Allow-Origin": "*", // better change this for production
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "Content-Type"
};

let client = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
}));

exports.handler = function (event, context, callback) {
    // only allow POST requests
    if (event.httpMethod !== "POST") {
        return callback(null, {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: 'Only POST requests allowed.',
            }),
        });
    }

    // parse the body to JSON so we can use it in JS
    const payload = JSON.parse(event.body);

    // validate the form
    if (
        !payload.email ||
        !payload.message
    ) {
        return callback(null, {
            statusCode: 422,
            headers,
            body: JSON.stringify({
                message: 'Required information is missing.',
            }),
        });
    }

    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: process.env.MAIL_RECIPIENT,
        subject: 'Contact les couteaux de Nono',
        text: `Expéditeur :\n${payload.email}\n Message :\n${payload.message}`
    }

    // finally everything is fine and we can send the mail
    return client.sendMail(mailOptions, (err, result) => {
        // if there happenend an error on the postmark side we send a 500 error to the client
        if (err) {
            return callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    message: "Internal Server Error: " + err,
                })
            });
        }
        // if everything was fine we send status code 200
        return callback(null, {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: "Message sent successfully!",
            }),
        });
    });
}