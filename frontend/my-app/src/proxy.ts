
import {NextRequest,NextResponse} from "next/server"

export function proxy(request:NextRequest){
    const cookies=request.cookies.get("access_token")

    const isAuthenticated=!!cookies

    const isPublicRoute=
    request.nextUrl.pathname==="/login"||
    request.nextUrl.pathname==="/register"||
    request.nextUrl.pathname==="/forgot-password"

    if(!isAuthenticated && !isPublicRoute){
        return NextResponse.redirect(new URL("/login",request.url))
    }

    if(isAuthenticated && request.nextUrl.pathname==="/login"){
        return NextResponse.redirect(new URL("/home",request.url))
    }

    return NextResponse.next()
}

export const config={
    matcher:[
        "/appointments/:path*",
        "/home/:path*",
        "/match-history/:path*",
        "/matches/:path*",
        "/messages/:path*",
        "/profile/:path*",
        "/settings/:path*",
        "/squad/:path*",
        "/dashboard/:path*"
    ]
}
