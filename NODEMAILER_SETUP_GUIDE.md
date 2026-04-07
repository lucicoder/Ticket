# Nodemailer Setup Guide - Digital Museum Ticket System

## Overview
This guide will help you set up the email server using Node.js and nodemailer to send automatic ticket confirmations.

## Prerequisites
- Node.js installed (version 14 or higher)
- npm (comes with Node.js)
- Email account with SMTP access (Gmail, Outlook, or NIC email)

## Installation Steps

### 1. Install Node.js Dependencies

Open terminal/command prompt in your project folder and run:

```bash
npm install
```

This will install:
- express (web server)
- nodemailer (email sending)
- cors (cross-origin requests)
- dotenv (environment variables)

### 2. Configure Email Credentials

Create a `.env` file in your project root (copy from `.env.example`):

```bash
copy .env.example .env
```

Edit `.env` file with your email credentials:

#### For Gmail:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=rohitgour20021@gmail.com
SMTP_PASSWORD=your-app-password
PORT=3000
```

**Important for Gmail:** 
- You need to use an "App Password", not your regular Gmail password
- Enable 2-Step Verification in your Google Account
- Generate App Password: https://myaccount.google.com/apppasswords
- Use the 16-character app password in `.env`

#### For Outlook/Hotmail:
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
PORT=3000
```

#### For NIC Email or Custom SMTP:
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-password
PORT=3000
```

### 3. Start the Server

Run the server:

```bash
npm start
```

You should see:
```
Server running on http://localhost:3000
Server is ready to send emails
```

### 4. Test the Setup

Open your browser and go to:
```
http://localhost:3000
```

Fill out the visitor registration form and complete a test booking. The email should be sent automatically when the ticket page loads.

## How It Works

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│  Browser    │         │  Node.js    │         │   SMTP      │
│  (Frontend) │────────▶│  Server     │────────▶│   Server    │
│             │  POST   │  (Backend)  │  Email  │  (Gmail)    │
└─────────────┘         └─────────────┘         └─────────────┘
     │                         │                        │
     │                         │                        │
     └─────────────────────────┴────────────────────────┘
              Email confirmation sent to visitor
```

1. User completes booking on `index.html`
2. Redirected to `ticket.html`
3. Frontend calls `/api/send-ticket-email` endpoint
4. Backend server uses nodemailer to send email via SMTP
5. Visitor receives email confirmation

## API Endpoint

### POST `/api/send-ticket-email`

**Request Body:**
```json
{
  "userEmail": "visitor@example.com",
  "userName": "John Doe",
  "bookingId": "DM-ABC123",
  "visitDate": "2024-03-15",
  "timeSlot": "10:00 – 11:00",
  "visitorsCount": 5,
  "amount": 250
}
```

**Response (Success):**
```json
{
  "success": true,
  "messageId": "<message-id@smtp.gmail.com>",
  "message": "Email sent successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Troubleshooting

### "SMTP connection error"
- Check SMTP credentials in `.env`
- Verify SMTP host and port are correct
- For Gmail, ensure you're using App Password
- Check firewall/antivirus blocking port 587

### "Authentication failed"
- Double-check email and password
- For Gmail, use App Password (not regular password)
- Ensure 2-Step Verification is enabled (Gmail)

### "Network error" in browser
- Make sure server is running (`npm start`)
- Check server is on http://localhost:3000
- Verify no other service is using port 3000

### Email not received
- Check spam/junk folder
- Verify email address is correct
- Check server console for error messages
- Test SMTP credentials with a simple script

## Development vs Production

### Development (Local Testing)
```bash
npm start
```
Access at: http://localhost:3000

### Production Deployment

For production, you need to:

1. **Deploy to a server** (VPS, cloud hosting, etc.)
2. **Use environment variables** (don't commit `.env` to git)
3. **Use HTTPS** (get SSL certificate)
4. **Set up process manager** (PM2 recommended):

```bash
npm install -g pm2
pm2 start server.js --name digital-museum-email
pm2 save
pm2 startup
```

5. **Configure reverse proxy** (Nginx/Apache) if needed

## Security Best Practices

1. **Never commit `.env` file** to version control
2. **Use strong passwords** for SMTP accounts
3. **Enable rate limiting** to prevent spam
4. **Validate all inputs** on server side
5. **Use HTTPS** in production
6. **Keep dependencies updated**: `npm update`

## Alternative SMTP Providers

If Gmail/Outlook doesn't work, consider:

- **SendGrid** (free tier: 100 emails/day)
- **Mailgun** (free tier: 5,000 emails/month)
- **Amazon SES** (pay as you go, very cheap)
- **NIC Email** (if you have government email)

## Testing Email Locally

For testing without sending real emails, use **Ethereal Email**:

```javascript
// In server.js, replace transporter with:
const transporter = await nodemailer.createTestAccount();
```

This creates a fake SMTP account for testing. Check emails at: https://ethereal.email

## Support

For nodemailer documentation: https://nodemailer.com/
For Express.js documentation: https://expressjs.com/
