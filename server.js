// server.js - Backend server using SendGrid Mail API for emails
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// SendGrid email sending endpoint
app.post('/api/send-ticket-email', async (req, res) => {
    try {
        const {
            userEmail,
            userName,
            bookingId,
            visitDate,
            timeSlot,
            visitorsCount,
            amount
        } = req.body;

        if (!userEmail || !userName || !bookingId) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        const ticketUrl = `${req.protocol}://${req.get('host')}/ticket.html?bookingId=${encodeURIComponent(bookingId)}`;

        const msg = {
            to: userEmail,
            from: {
                email: process.env.SENDGRID_FROM,
                name: 'Digital Museum, Assam Legislative Assembly'
            },
            subject: 'Ticket Confirmation - Digital Museum, Assam Legislative Assembly',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #004d99; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                        .ticket-details { background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #004d99; }
                        .ticket-details p { margin: 8px 0; }
                        .button { display: inline-block; padding: 12px 24px; background-color: #004d99; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                        .important { background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Digital Museum</h1>
                            <p>Assam Legislative Assembly</p>
                        </div>
                        <div class="content">
                            <h2>Namaskar ${userName},</h2>
                            <p>Your visit to the <strong>Digital Museum, Assam Legislative Assembly</strong> is confirmed!</p>
                            <div class="ticket-details">
                                <p><strong>Booking ID:</strong> ${bookingId}</p>
                                <p><strong>Visit Date:</strong> ${visitDate}</p>
                                <p><strong>Time Slot:</strong> ${timeSlot}</p>
                                <p><strong>Total Visitors:</strong> ${visitorsCount}</p>
                                <p><strong>Amount Paid:</strong> ₹${amount}</p>
                                <p><strong>Entry Gate:</strong> Gate No. 14</p>
                            </div>
                            <p><strong>View Your Ticket:</strong></p>
                            <a href="${ticketUrl}" class="button">View Ticket & QR Code</a>
                            <div class="important">
                                <p><strong>Rules for Visitors:</strong></p>
                                <ul>
                                    <li>All visitors will be provided entry from Gate No.14, Assam Legislative Assembly.</li>
                                    <li>All visitors must report at Gate No.14 at least 15 minutes before the allotted time slot.</li>
                                    <li>All visitors must carry a valid identification card as mentioned in the registration form and produce the same on demand to the security personnel.</li>
                                    <li>Following IDs are acceptable: Passport, Voter ID Card, Aadhaar Card, PAN Card, Driving License, Government Employee ID Card or any ID issued by Government.</li>
                                    <li>All visitors and members must pass through a security check.</li>
                                    <li>All visitors will be frisked before entering the premises.</li>
                                    <li>Any kind of firearm, ammunition, inflammable material, or sharp object is strictly prohibited.</li>
                                    <li>Smoking, consumption or carrying tobacco, chewing gum, etc. is strictly prohibited.</li>
                                    <li>Water or any liquid items are not allowed inside the Digital Museum.</li>
                                    <li>All visitors must adhere to the instructions given by Assam Legislative officials.</li>
                                    <li>Camera/Mobiles may be used only at designated places with permission from officials.</li>
                                    <li>The guided tour will be suspended one week prior to commencement of the Assam Legislative Assembly session and remain suspended for three days after the session.</li>
                                    <li>The amount once paid will not be refunded.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>© Assam Legislative Assembly – Digital Museum</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        await sgMail.send(msg);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email with SendGrid:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Email server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Make sure to configure .env file with SendGrid credentials`);
});
