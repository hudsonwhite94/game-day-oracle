import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getPrediction(gameDetails) {
  console.log("Sending prompt to GPT:", gameDetails);
  console.log("API Key loaded:", import.meta.env.VITE_OPENAI_API_KEY); // 🔍 Check if this is undefined

  const prompt = `You are Game Day Oracle, a hot take machine. Analyze this matchup and give confident predictions, betting advice (entertainment only), and a fun 'what-if': ${gameDetails}`;

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    console.log("GPT Response:", res); // 🧠 See what comes back

    return res.choices[0].message.content;
  } catch (err) {
    console.error("GPT Error:", err);
    return "Error: Unable to get prediction. Check your API key or quota.";
  }
}
