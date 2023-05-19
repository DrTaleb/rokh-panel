export default async function Handler(req, res) {
    const params = req.query.userId
    if (req.method === "PUT") {
        const userToken = req.cookies.userToken
        try {
            const dataRes = await fetch(`${process.env.SERVER_URL}/account/changepassword/`,{
                method : "PUT",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Token ${userToken}`
                },
                body : req.body
            })
            const data = await dataRes.json()
            res.status(200).json(data)
        }catch {
            res.status(500).json({"massage" : "ارور سرور"})
        }
    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "درخواست غیر معتبر"})
    }
}
