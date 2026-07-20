import 'dotenv/config';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function main() {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: 'Reply with exactly: Groq is working!'
        }
      ],
      temperature: 0
    });

    console.log(response.choices[0].message.content);

  } catch (err) {
    console.error(err);
  }
}

main();