const axios = require('axios')

const getStatusStyle = (status) => {
  if (status === 'in-progress') {
    return { color: '#2563eb', bg: '#eff6ff', emoji: '🔵', label: 'In Progress' }
  } else if (status === 'resolved') {
    return { color: '#16a34a', bg: '#f0fdf4', emoji: '🟢', label: 'Resolved' }
  } else {
    return { color: '#d97706', bg: '#fffbeb', emoji: '🟡', label: 'Pending' }
  }
}

const sendEmail = async (to, name, message, status = 'pending') => {
  const s = getStatusStyle(status)

  let subjectLine = `🔔 Your query status updated to ${s.label} — QueryFlow`
  if (status === 'pending') {
    subjectLine = '✅ We received your query — QueryFlow'
  }

  try {
    console.log('Notification Service: Dispatching email delivery task via Brevo api to:', to)

    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { name: 'QueryFlow', email: process.env.MAIL_FROM },
        to: [{ email: to }],
        subject: subjectLine,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
            <div style="background: #4f46e5; padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: -0.5px;">QueryFlow</h1>
              <p style="color: #c7d2fe; margin: 8px 0 0; font-size: 14px;">Query Management System</p>
            </div>
            <div style="padding: 32px; background: #ffffff;">
              <h2 style="color: #111827; font-size: 20px; margin: 0 0 8px;">Hi ${name} 👋</h2>
              <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                ${status === 'pending'
                  ? "Thanks for reaching out! We've received your query and our team will get back to you as soon as possible."
                  : `Your query status has been updated. Here's the latest on your submission.`}
              </p>
              <div style="background: #f9fafb; border-left: 4px solid #4f46e5; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
                <p style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Your message</p>
                <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0;">${message}</p>
              </div>
              <div style="background: ${s.bg}; border-radius: 8px; padding: 14px 20px; margin-bottom: 24px;">
                <p style="color: ${s.color}; font-size: 14px; margin: 0;">${s.emoji} Status: <strong>${s.label}</strong> — we'll notify you when this updates.</p>
              </div>
              <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                If you didn't submit this query, you can safely ignore this email.
              </p>
            </div>
            <div style="background: #f9fafb; padding: 20px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 QueryFlow · crafted with ❤️ by <a href="https://github.com/saikat-codes" style="color: #4f46e5; text-decoration: none; font-weight: 500;">saikat</a></p>
            </div>
          </div>
        `
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('Email sent successfully to:', to)
  } catch (error) {
    console.log('Email delivery failing details:', error.response?.data || error.message)
  }
}

const sendTelegram = async (name, email, message, status = 'pending') => {
  const s = getStatusStyle(status)

  let trackingTitle = 'Query Status Updated'
  if (status === 'pending') {
    trackingTitle = 'New Query Received'
  }

  try {
    console.log('Notification Service: Broadcasting query feed push out to Telegram logs...')
    const text = `
🔔 *${trackingTitle}*

👤 *Name:* ${name}
📧 *Email:* ${email}

💬 *Message:*
${message}

${s.emoji} *Status:* ${s.label}
⏰ *Time:* ${new Date().toLocaleString()}
    `.trim()

    await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        params: {
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: text
        }
      }
    );
    console.log('Telegram event channel updated successfully')
  } catch (error) {
    console.log('Telegram pipe delivery failed:', error.message)
  }
}

module.exports = { sendEmail, sendTelegram }
