import 'dotenv/config';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getElementIndex(page, userPrompt) {

  const elements = await page.evaluate(() => {

    return [...document.querySelectorAll(
      'input, button, select, textarea, a, label, [role="button"]'
    )].map((el, index) => ({
      index,
      tag: el.tagName.toLowerCase(),
      type: el.type || '',
      id: el.id || '',
      name: el.name || '',
      text: el.innerText?.trim() || '',
      placeholder: el.placeholder || '',
      ariaLabel: el.getAttribute('aria-label') || ''
    }));

  });

  const prompt = `
You are a QA Automation Expert.

Interactive Elements:

${JSON.stringify(elements, null, 2)}

User Request:
"${userPrompt}"

Return ONLY the matching element index.

Example:
0
2
5
`;

  const response = await groq.chat.completions.create({

    model: 'llama-3.3-70b-versatile',

    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],

    temperature: 0

  });

  const answer = response.choices[0].message.content.trim();

  console.log("🤖 Groq:", answer);

  return Number(answer);
}