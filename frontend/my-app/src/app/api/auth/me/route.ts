import {cookies} from "next/headers"
import {NextResponse} from "next/server"


export async function GET(){
    const cookieStore=await cookies()
    const accessToken=cookieStore.get("access_token")

    if(!accessToken){
        return NextResponse.json({
            message:"Não autorizado"
        },
        {
            status:401
        }
    )
    }

        const apiResponse=await fetch(`${process.env.API_URL}/auth/me`,{
        method:"GET",
        headers:{
            Cookie:`access_token=${accessToken?.value}`
        },
        cache:"no-store"
    })

    const result=await apiResponse.json().catch(()=> null)

    if(!apiResponse.ok){
        const response= NextResponse.json({
            message:"sessão inválida"
        },
    {
        status:401
    })
    if(apiResponse.status=== 401){
        response.cookies.delete("access_token")
    }
    return response
    }



    return NextResponse.json(result)
}
