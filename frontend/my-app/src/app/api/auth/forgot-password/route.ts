import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const apiResponse = await fetch(`${process.env.API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const result=await apiResponse.json().catch(()=> null)

  if(!apiResponse.ok){
    return NextResponse.json(result,{
        status:apiResponse.status
    })
  }


  const response=NextResponse.json(result)

  return response
}


