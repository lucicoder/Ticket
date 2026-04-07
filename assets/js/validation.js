// Email validation and sending functionality for Digital Museum tickets
// Uses backend server with nodemailer
// Version: 1.0.1

/**
 * API endpoint for sending emails
 * Change this if your server runs on a different port or domain
 */
const API_BASE_URL = window.location.origin; // Uses same domain as frontend
const EMAIL_API_ENDPOINT = `${API_BASE_URL}/api/send-ticket-email`;

/**
 * Send ticket confirmation email to visitor via backend API
 * @param {string} userEmail - Visitor's email address
 * @param {string} userName - Visitor's full name
 * @param {string} bookingId - Unique booking ID
 * @param {string} visitDate - Visit date
 * @param {string} timeSlot - Time slot
 * @param {number} visitorsCount - Number of visitors
 * @param {number} amount - Total amount paid
 * @returns {Promise<Object>} Result object with success status
 */
export async function sendTicketEmail(userEmail, userName, bookingId, visitDate, timeSlot, visitorsCount, amount) {
    
    // Validate email format
    if (!isValidEmail(userEmail)) {
        console.error("Invalid email address:", userEmail);
        return { success: false, error: "Invalid email address" };
    }

    try {
        // Send request to backend API
        const response = await fetch(EMAIL_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail,
                userName,
                bookingId,
                visitDate,
                timeSlot,
                visitorsCount,
                amount
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            console.log("Email sent successfully!", result.messageId);
            return { success: true, messageId: result.messageId };
        } else {
            console.error("Email sending failed:", result.error);
            return { success: false, error: result.error || "Failed to send email" };
        }
        
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message || "Network error" };
    }
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show email sending status to user
 * @param {boolean} success - Whether email was sent successfully
 * @param {string} email - Email address
 */
export function showEmailStatus(success, email) {
    const statusDiv = document.getElementById('emailStatus');
    if (!statusDiv) return;

    if (success) {
        statusDiv.innerHTML = `
            <div style="padding: 12px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 4px; margin: 10px 0;">
                ✓ Ticket confirmation sent to ${email}
            </div>
        `;
    } else {
        statusDiv.innerHTML = `
            <div style="padding: 12px; background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
                ⚠ Could not send email. Please save this page or take a screenshot of your ticket.
            </div>
        `;
    }
}