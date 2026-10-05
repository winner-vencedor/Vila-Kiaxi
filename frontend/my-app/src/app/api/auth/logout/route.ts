import {cookies} from "next/headers"
import {NextResponse} from "next/server"


export async function POST(){
    const cookieStore=await cookies()
    const accessToken=cookieStore.get("access_token")

    const apiResponse=await fetch(`${process.env.API_URL}/auth/logout`,{
        method:"POST",
        headers:accessToken
        ?{
            Cookie:`access_token=${accessToken.value}`
        }
        :undefined,
        cache:"no-store"
    })

    const result=await apiResponse.json().catch(()=> null)

    const response=NextResponse.json(result,{
        status:apiResponse.status
    })

    const setCookie=apiResponse.headers.get("set-cookie")
    if(setCookie){
        response.headers.append("set-cookie",setCookie)
    }

    response.cookies.set("access_token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
    })

    return response
}
