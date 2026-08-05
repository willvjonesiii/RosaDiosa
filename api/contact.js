const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, message, _hp, loadedAt } = req.body || {};

  // Honeypot — humans never fill this hidden field; bots do. Silently succeed so bots learn nothing.
  if (_hp) return res.status(200).json({ ok: true });

  // Bots posting straight to this endpoint (skipping the actual page load) have no real
  // page-load moment to report — missing or implausibly-fast timestamps are silently
  // accepted-but-discarded too, same as the honeypot.
  if (!loadedAt || (Date.now() - Number(loadedAt)) < 1500) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Templo de la Diosa Rosa <hello@rosadiosa.com>',
      to: 'rosadiazdl@gmail.com',
      reply_to: email,
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};
