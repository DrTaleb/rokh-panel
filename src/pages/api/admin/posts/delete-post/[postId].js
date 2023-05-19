
export default async function Handler(req, res) {
    const userToken = req.cookies.userToken
    if (req.method === "DELETE"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/page/posts/${req.query.postId}/`,{
            method : "DELETE",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Token ${userToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
