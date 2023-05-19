import cookie from "cookie";

export default async function Handler(req, res) {
    if (req.method === "POST") {
        const userToken = req.cookies.userToken
        await fetch(`${process.env.SERVER_URL}/account/logout/`,{
            method : "DELETE",
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Token ${userToken}`
            }
        }).then(res => res.json()).then(data =>{
            if (data.status){
                res.setHeader('Set-Cookie', cookie.serialize('userToken', "", {
                    httpOnly: true,
                    expires : new Date(0),
                    path: "/"
                }));
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
