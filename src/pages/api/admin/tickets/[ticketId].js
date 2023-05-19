
export default async function Handler(req, res) {
    const userToken = req.cookies.userToken
    if (req.method === "GET"){
        try {
            const dataResponse = await fetch(`${process.env.SERVER_URL}/page/tickets/${req.query.ticketId}`,{
                method : "GET",
                headers : {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Token ${userToken}`
                }
            })
            const data = await dataResponse.json()
            res.status(200).json(data)
        }catch {
            res.status(500).json({massage : "ارور سرور"})
        }
    }else if (req.method === "POST") {
        try {
            console.log(req.body)
            await fetch(`${process.env.SERVER_URL}/page/tickets/${req.query.ticketId}/`,{
                method : "POST",
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Token ${userToken}`
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
