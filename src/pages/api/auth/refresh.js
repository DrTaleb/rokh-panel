import cookie from "cookie";
import {NextResponse} from "next/server";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default async function Handler(req, res) {
    const refreshToken = req.cookies.refreshToken
    if (req.method === "GET") {
        try {
            await fetch(`${process.env.SERVER_URL}/accounts/refresh/`,{
                method : "POST",
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body : JSON.stringify({
                    refresh : `${refreshToken}`
                })
            }).then(response => response.json()).then(data =>{
                if (data.access){
                res.setHeader('Set-Cookie', cookie.serialize('accessToken', data.access, {
                        httpOnly: true,
                        maxAge: 60 * 5 ,// 5 min
                        path : "/"
                    }));
                    res.status(200).json({"status" : true})
                }else {
                    // return NextResponse.redirect(`${process.env.LOCAL_URL}/login`)
                    res.status(200).json({"status" : false})
                }
            })
        }catch {
            // return NextResponse.redirect(`${process.env.LOCAL_URL}/login`)
            res.status(200).json({"status" : false})
        }
    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "درخواست غیر معتبر"})
    }
}
