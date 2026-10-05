import {NextRequest ,NextResponse} from "next/server"

export async function POST(request:NextRequest){
    const body=await request.json()
    const token=request.nextUrl.searchParams.get(`token`)

    if(!token){
        return NextResponse.json({
            message:"Token de recuperação não informado"
        },{status:400})
    }

    const apiResponse=await fetch(`${process.env.API_URL}/auth/reset-password`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            token,
            password:body.password
        }),
        cache:"no-store"
    })

    const result =await apiResponse.json().catch(()=> null)

    if(!apiResponse.ok){
        return NextResponse.json(result,{
            status:apiResponse.status
        })
    }

    const response= NextResponse.json(result)

    return response
}
