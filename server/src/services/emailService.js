const { Resend } = require('resend');

async function sendContactNotification({ name, email, message }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set, skipping email notification');
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'Portfolio Contact Form <onboarding@resend.dev>',
    to: process.env.CONTACT_TO_EMAIL,
    reply_to: email,
    subject: `New contact form message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}

module.exports = { sendContactNotification };
