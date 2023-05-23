import {NextRequest, NextResponse} from "next/server";
import cookie from "cookie";


export async function middleware(req, res) {

    const accessToken = req.cookies.get("accessToken")
    const refreshToken = req.cookies.get("refreshToken")
    if (req.nextUrl.pathname.startsWith("/login")) {
        if (refreshToken) {
            if (accessToken) {
                return NextResponse.redirect(`${process.env.LOCAL_URL}/admin`)
            }
        }
    } else if (req.nextUrl.pathname.startsWith("/admin")) {
        if (refreshToken === undefined) {
            return NextResponse.redirect(`${process.env.LOCAL_URL}/login`)
        }
    } else if (req.nextUrl.pathname.endsWith("/")) {
        return NextResponse.redirect(`${process.env.LOCAL_URL}/admin`)

    }
}