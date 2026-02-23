/**
 * Vercel serverless function: forwards enquiry form to Google Apps Script.
 * Set GOOGLE_SCRIPT_URL in Vercel project Environment Variables.
 */

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyqSvQDifo9yQg2a6iDc0iR-8u4ZJJq1dsAkL0L6lKivJoErvrZ_RxykFifZT-RyxBY/exec';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  if (!GOOGLE_SCRIPT_URL) {
    return res.status(500).json({
      success: false,
      error: 'Server: Set GOOGLE_SCRIPT_URL in Vercel Environment Variables',
    });
  }

  try {
    const { name = '', number = '', address = '' } = req.body || {};
    const body = new URLSearchParams({ name, number, address }).toString();

    const scriptRes = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const text = await scriptRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: false, error: 'Invalid response from script' };
    }

    return res.status(scriptRes.ok ? 200 : 400).json(data);
  } catch (err) {
    console.error('Enquiry proxy error:', err);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again.',
    });
  }
}
