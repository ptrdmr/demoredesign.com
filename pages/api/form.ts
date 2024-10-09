import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  runtime: 'edge',
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const body = await req.json()

  const response = await fetch(`https://api.netlify.com/api/v1/forms/${process.env.NEXT_PUBLIC_NETLIFY_FORM_ID}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    return res.status(500).json({ message: 'Error submitting to Netlify' })
  }

  return res.status(200).json({ message: 'Form submitted successfully' })
}
