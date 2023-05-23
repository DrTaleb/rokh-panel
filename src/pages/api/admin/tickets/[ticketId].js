
export default async function Handler(req, res) {
    const accessToken = req.cookies.accessToken
    if (req.method === "GET"){
        try {
            const dataResponse = await fetch(`${process.env.SERVER_URL}/page/tickets/${req.query.ticketId}`,{
                method : "GET",
                headers : {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Bearer ${accessToken}`
                }
            })
            const data = await dataResponse.json()
            res.status(200).json(data)
        }catch {
            res.status(500).json({massage : "ارور سرور"})
        }
    }else if (req.method === "POST") {
        try {
            await fetch(`${process.env.SERVER_URL}/page/tickets/${req.query.ticketId}/`,{
                method : "POST",
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

    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
