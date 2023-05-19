import formidable from "formidable"
import FormData from "form-data"
import fs from 'fs'
import axios from "axios";


export const config = {
    api: {
        bodyParser: false
    }
}
export default async function Handler(req, res) {
    const userToken = req.cookies.userToken
    if (req.method === "GET"){
        try {
            const dataResponse = await fetch(`${process.env.SERVER_URL}/page/mainsettings/`,{
                method : "GET",
                headers : {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Token ${userToken}`
                }
            })
            const data = await dataResponse.json()
            res.status(200).json(data)
        }catch (err){
            res.status(500).json({massage : err})
        }
    } else if (req.method === "POST") {
        try {
            const form = formidable({multiples: false});
            await form.parse(req, async (err, fields, files) => {
                var myFormData = new FormData();
                await myFormData.append("name", fields.name)
                await myFormData.append("description", fields.description)
                await myFormData.append("address", fields.address)
                await myFormData.append("number", fields.number)
                await myFormData.append("email", fields.email)
                if (files.image){
                    await myFormData.append("image", fs.createReadStream(files.image.filepath), `${files.image.originalFilename}`)
                }
                const data = await axios.put('https://server.hanousa.ir/page/mainsettings/', myFormData, {
                    headers: {
                        'Authorization': `Token ${userToken}`,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                console.log(data.data)
                res.status(200).json(data.data)
            })
        }catch {
            res.status(500).json({message  : "server error"})
        }
    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
