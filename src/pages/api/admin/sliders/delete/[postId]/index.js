
export default async function Handler(req, res) {
    const userToken = req.cookies.userToken
    if (req.method === "DELETE"){
        try {
            const dataResponse = await fetch(`${process.env.SERVER_URL}/page/slides/${req.query.postId}`,{
                method : "DELETE",
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
    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
