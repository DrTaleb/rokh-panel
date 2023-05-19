

export default async function Handler(req, res) {
    if (req.method === "GET") {
        try {
            const userToken = req.cookies.userToken
            await fetch(`${process.env.SERVER_URL}/account/getme/`,{
                method : "GET",
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Token ${userToken}`
                },
            }).then(response => response.json()).then(data =>{
                if (data.user_id){
                    res.status(200).json(data)
                }else {
                    res.status(200).json({massage : "user not found"})
                }
            })
        }catch {
            res.status(500).json({"massage" : "ارور سرور"})
        }
    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "درخواست غیر معتبر"})
    }
}