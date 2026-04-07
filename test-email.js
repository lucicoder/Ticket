// Quick test script to verify email configuration
const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Testing email configuration...\n');
console.log('Email:', process.env.SMTP_USER);
console.log('SMTP Host:', process.env.SMTP_HOST);
console.log('SMTP Port:', process.env.SMTP_PORT);
console.log('\nAttempting to connect...\n');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.error('❌ SMTP Connection FAILED:');
        console.error(error.message);
        console.log('\n⚠️  Your regular Gmail password will NOT work!');
        console.log('📖 Please read QUICK_START.md for instructions on getting an App Password.\n');
    } else {
        console.log('✅ SMTP Connection SUCCESSFUL!');
        console.log('🎉 Your email server is ready to send emails!\n');
        console.log('Next step: Run "npm start" to start the server.\n');
    }
});
