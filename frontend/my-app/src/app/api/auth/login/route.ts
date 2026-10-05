import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  const body = await request.json();

  const apiResponse = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const result = await apiResponse.json().catch(() => null);

  if (!apiResponse.ok) {
    return NextResponse.json(result, {
      status: apiResponse.status,
    });
  }

  const response = NextResponse.json(result);

  const setcookie = apiResponse.headers.get('set-cookie');

  if (setcookie) {
    response.headers.append('set-cookie', setcookie);
  }

  return response;
}
