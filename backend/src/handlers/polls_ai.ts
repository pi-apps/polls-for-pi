import axios from "axios";
import { Router } from "express";
import _ from 'lodash';
import env from '../environments';
import "../types/session";

const OPENAI_API_KEY = env.openai_api_key;

async function generatePollOptions(question: string, optionsCount: number): Promise<string[]> {
  const prompt = `Generate ${optionsCount} choices for the question '${question}'`
  console.log('prompt', prompt)
  const response = await axios.post("https://api.openai.com/v1/engines/text-davinci-002/completions", {
    prompt: prompt,
    max_tokens: 50,
    n: 1,
    format: 'text'
  }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    }
  });

  if (response.status === 200) {
    const choices = response.data.choices;
    console.log('response.data', response.data);
    if (choices && choices.length > 0) {
      let tokens = choices[0].text.split(/\r?\n/).filter((line: any) => line.trim() !== '');
      console.log('tokens-1', tokens)
      if(tokens.length === 1) tokens = tokens[0].split(",");
      console.log('tokens-2', tokens)
      //const optionsArray = tokens.map((token: any) => String(token));

      // trim whitespace from each string in the array
      const optionsArray: string[] = [];
      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i].trim();
        if (!_.isEmpty(token) && token !== '') {
          optionsArray[i] = token;
        }
      }
      return optionsArray;
    }
  }

  throw new Error(`Request failed with status code ${response.status}`);
}

export default function mountPollsAiEndpoints(router: Router) {
  router.post('/', async (req, res) => {
    console.log('polls ai api endpoint')
    console.log('polls ai api endpoint')

    const prompt = req.body.prompt;
    const optionsCount = req.body.optionsCount || 2;
    console.log('prompt', prompt)
    console.log('optionsCount', optionsCount)

    const options = await generatePollOptions(prompt, optionsCount);
    console.log('options', options);

    // failed to generate options
    if (!options || options.length <= 0) {
      return res.status(400).json({ message: "Failed to generate options." });
    }

    return res.status(200).json({ data: options.slice(0, optionsCount) });
  });

}
