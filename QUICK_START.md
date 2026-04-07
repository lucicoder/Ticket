# Quick Start Guide - Get Your Email System Working

## Important: Gmail App Password Required

Your regular Gmail password (`Rohit###2002`) **will NOT work** with nodemailer due to Gmail security.

You have 2 options:

---

## Option 1: Use Gmail App Password (Recommended - More Secure)

### Step 1: Enable 2-Step Verification
1. Go to: https://myaccount.google.com/security
2. Click "2-Step Verification" and turn it ON
3. Follow the prompts to verify your phone number

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Click "Generate"
4. Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)

### Step 3: Update .env File
Replace the password in `.env` with your new App Password:
```
SMTP_PASSWORD=abcdefghijklmnop
```
(Remove spaces from the app password)

---

## Option 2: Enable Less Secure Apps (Not Recommended)

If you can't use App Password, you can enable "Less secure app access":

1. Go to: https://myaccount.google.com/lesssecureapps
2. Turn ON "Allow less secure apps"
3. Your current password in `.env` should work

**Warning:** This is less secure and Google may block it anyway.

---

## Running the Project

### Step 1: Install Dependencies
Open terminal in your project folder and run:
```bash
npm install
```

### Step 2: Start the Server
```bash
npm start
```

You should see:
```
Server running on http://localhost:3000
Server is ready to send emails
```

### Step 3: Open the Website
Open your browser and go to:
```
http://localhost:3000
```

### Step 4: Test Booking
1. Fill out the visitor registration form
2. Complete payment
3. Check if email is sent to the visitor's email address

---

## Troubleshooting

### "Invalid login" or "Authentication failed"
- You need to use App Password (Option 1 above)
- Regular Gmail password won't work

### "SMTP connection error"
- Check your internet connection
- Make sure port 3000 is not being used by another app
- Try restarting the server

### Email not received
- Check spam/junk folder
- Verify the visitor's email address is correct
- Check server console for error messages

---

## Current Configuration

Your `.env` file is already created with:
- Email: rohitgour20021@gmail.com
- Password: Rohit###2002 (needs to be changed to App Password)
- Server Port: 3000

**Next Step:** Follow Option 1 above to get your App Password and update the `.env` file.
