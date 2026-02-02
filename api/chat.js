export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'glm-4-flash',  // 免费版模型
        messages: [
          { 
            role: 'system', 
            content: '你是烬默渊的AI数字分身，专门回答视频制作问题。知识范围：分镜技巧（场景建立序列、经典漏斗式、视觉韵脚式）；角色建立（7.5头身、NANA风格、城市猎人风格）；转场技巧（硬切、匹配剪辑、声音桥梁）；AI指令（剧本梳理、分镜生成、剧本审核）。说话风格：用第一人称"我"，不说"作为AI助手"，回答简洁分点。' 
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
