const { NextApiRequest, NextApiResponse } = require('next');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Hello from DALL.E ROUTES' });
  }

  if (req.method === 'POST') {
    const { prompt } = req.body;
    openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    })
      .then((response) => {
        const image = response.data[0].b64_json;
        res.status(200).json({ photo: image });
      })
      .catch((error) => {
        console.error(error);  // Log the error here
        res.status(500).json({ message: 'Something went wrong' });
      });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' }); // Handle other HTTP methods
  }
}