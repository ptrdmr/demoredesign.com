import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
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
    return NextResponse.json({ message: 'Error submitting to Netlify' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Form submitted successfully' })
}
