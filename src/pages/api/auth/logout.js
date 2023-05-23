import cookie from "cookie";

export default async function Handler(req, res) {
    if (req.method === "POST") {
        const accessToken = req.cookies.accessToken
        await fetch(`${process.env.SERVER_URL}/accounts/logout/`,{
            method : "POST",
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${accessToken}`
            }
        }).then(res => res.json()).then(data =>{
            console.log(data)
            if (data.status){

                res.setHeader('Set-Cookie', [
                    cookie.serialize('refreshToken', "", {
                        httpOnly: true,
                        expires : new Date(0),
                        path : "/"
                    }),
                    cookie.serialize('accessToken', "", {
                        httpOnly: true,
                        expires : new Date(0),
                        path : "/"
                    })
                ]);
                res.status(200).json({massage : data})
            } else {
                res.status(400).json({massage : "not deleted"})
            }
        })


    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
