export default async function Handler(req, res) {
    const accessToken = req.cookies.accessToken
    if (req.method === "PUT") {
        try {
            await fetch(`${process.env.SERVER_URL}/page/admins/${req.query.userId}/`,{
                method : "PUT",
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Bearer ${accessToken}`
                },
                body : JSON.stringify({
                    is_active : true
                })
            }).then(res => res.json()).then(data =>{
                res.status(200).json(data)
            })
        }catch  {
            res.status(500).json({massage : "ارور سرور"})
        }
    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}




