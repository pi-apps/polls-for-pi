import axios from "axios";
import { Router } from "express";
import env from '../environments';
import "../types/session";

const OPENAI_API_KEY = env.openai_api_key;

async function generateText(prompt: string): Promise<string> {
  const response = await axios.post("https://api.openai.com/v1/engines/davinci-codex/completions", {
    prompt: prompt,
    max_tokens: 50
  }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    }
  });

  if (response.status === 200) {
    const choices = response.data.choices;
    if (choices && choices.length > 0) {
      return choices[0].text;
    }
  }

  throw new Error(`Request failed with status code ${response.status}`);
}

export default function mountPollsAiEndpoints(router: Router) {
  router.post('/', async (req, res) => {
    console.log('polls ai api endpoint')

    const app = req.app;
    const { Product } = app.locals.collections;
    const products = await Product.find({ });

    const prompt = req.body.prompt;
    console.log('prompt', prompt)

    generateText(prompt)
      .then((generatedText) => {
        console.log(generatedText);
      })
      .catch((error) => {
        console.error(error);
      });


    // order doesn't exist
    if (!products || products.length <= 0) {
      return res.status(400).json({ message: "No products found." });
    }

    return res.status(200).json({ data: products });
  });

}
