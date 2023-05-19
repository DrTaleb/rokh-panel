import cookie from "cookie";

export default async function Handler(req, res) {
    if (req.method === "POST") {
        try {
            await fetch(`${process.env.SERVER_URL}/accounts/login/`,{
                method : "POST",
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body : req.body
            }).then(response => response.json()).then(data =>{
                if (data.access){
                    res.setHeader('Set-Cookie', [
                        cookie.serialize('refreshToken', data.refresh, {
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 30 , // 30 days
                            path : "/"
                        }),
                        cookie.serialize('accessToken', data.access, {
                            httpOnly: true,
                            maxAge: 60 * 5 , // 5 min
                            path : "/"
                        })
                    ]);
                }
                res.status(200).json(data)
            })
        }catch {
            res.status(500).json({"massage" : "ارور سرور"})
        }
    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "درخواست غیر معتبر"})
    }
}
