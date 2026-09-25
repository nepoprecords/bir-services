import type { VercelRequest, VercelResponse } from '@vercel/node';

async function sendTelegramAlert(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });
  } catch (err) {
    console.error('Telegram dispatch error:', err);
  }
}

// Serverless function to receive customer service bookings
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body;
    const { booking_ref, customer_name, phone, service_name, hub, urgency, notes } = body || {};

    if (!phone || !service_name) {
      return res.status(400).json({ error: 'Phone number and service are required.' });
    }

    // 1. If Supabase credentials exist, store in Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.VITE_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/bookings`, {
          method: 'POST',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Supabase REST error for booking:', errorText);
        }
      } catch (err) {
        console.error('Failed to forward booking to Supabase:', err);
      }
    }

    // 2. Dispatch instant alert to Telegram Bot (if configured)
    const telegramMessage = `⚡️ <b>NEW CUSTOMER SERVICE BOOKING</b>\n` +
      `<b>Ref:</b> <code>${booking_ref || 'BIR-BK-NEW'}</code>\n` +
      `<b>Service:</b> ${service_name}\n` +
      `<b>Customer:</b> ${customer_name || 'Guest'}\n` +
      `<b>Phone:</b> <a href="tel:+977${phone}">+977 ${phone}</a>\n` +
      `<b>Area / Hub:</b> ${hub || 'East Nepal'}\n` +
      `<b>Urgency:</b> ${urgency || 'routine'}\n` +
      `<b>Notes:</b> <i>${notes || 'None'}</i>`;

    await sendTelegramAlert(telegramMessage);

    return res.status(200).json({
      success: true,
      message: 'Booking logged successfully',
      booking_ref,
    });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
