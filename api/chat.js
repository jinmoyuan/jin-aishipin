export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://api.coze.cn/open_api/v2/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COZE_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({
        bot_id: process.env.COZE_BOT_ID,
        user_id: 'web_user',
        additional_messages: [
          { role: 'user', content: message }
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
