export default async function Handler(req, res) {
    const accessToken = req.cookies.accessToken
    console.log(req.headers)
    if (req.method === "GET"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/page/posts/${req.query.postId}/`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${accessToken}`
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