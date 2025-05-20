import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getPrediction(gameDetails) {
  const prompt = `You are Game Day Oracle, an unfiltered sports guru with bold NFL/NCAA takes. Analyze this matchup and give confident predictions, betting angles (disclaimer: for entertainment only), and answer a “what if” question: ${gameDetails}`;

  const res = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return res.data.choices[0].message.content;
}
