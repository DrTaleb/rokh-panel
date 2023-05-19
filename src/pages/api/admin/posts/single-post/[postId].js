export default async function Handler(req, res) {
    const userToken = req.cookies.userToken
    console.log(req.headers)
    if (req.method === "GET"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/page/posts/${req.query.postId}/`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Token ${userToken}`
            }
        })
        const data = await dataResponse.json()
        console.log(data)
        res.status(200).json(data)
    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}