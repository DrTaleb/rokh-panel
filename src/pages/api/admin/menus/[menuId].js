
export default async function Handler(req, res) {
    const accessToken = req.cookies.accessToken
    if (req.method === "DELETE") {
        try {
            await fetch(`${process.env.SERVER_URL}/page/menus/${req.query.menuId}`,{
                method : "DELETE",
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Bearer ${accessToken}`
                },
            }).then(res => res.json()).then(data =>{
                res.status(200).json(data)
            })
        }catch {
            res.status(500).json({massage : "ارور سرور"})
        }
    }else if (req.method === "PUT") {
        try {
            await fetch(`${process.env.SERVER_URL}/page/menus/${req.query.menuId}/`,{
                method : "PUT",
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Bearer ${accessToken}`
                },
                body : req.body
            }).then(res => res.json()).then(data =>{
                res.status(200).json(data)
            })
        }catch {
            res.status(500).json({massage : "ارور سرور"})
        }
    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
