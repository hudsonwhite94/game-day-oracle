import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getPrediction(gameDetails) {
  const prompt = `You are Game Day Oracle, a hot take machine. Analyze this matchup and give confident predictions, betting advice (entertainment only), and a fun 'what-if': ${gameDetails}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return res.choices[0].message.content;
}
