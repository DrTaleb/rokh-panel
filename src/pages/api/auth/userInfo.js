

export default async function Handler(req, res) {
    if (req.method === "GET") {
        try {
            const accessToken = req.cookies.accessToken
            await fetch(`${process.env.SERVER_URL}/accounts/getme/`,{
                method : "GET",
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Bearer ${accessToken}`
                },
            }).then(response => response.json()).then(data =>{
                if (data.user_id){
                    res.status(200).json({status : true , data : data})
                }else {
                    res.status(200).json({status : false})
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