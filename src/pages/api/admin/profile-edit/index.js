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
    const accessToken = req.cookies.accessToken
    if (req.method === "GET"){
        try {
            const dataResponse = await fetch(`${process.env.SERVER_URL}/accounts/profile/`,{
                method : "GET",
                headers : {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization' : `Bearer ${accessToken}`
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
                await myFormData.append("bio", fields.bio)
                await myFormData.append("birth_year", fields.birth_year)
                await myFormData.append("pezeshki_code", fields.pezeshki_code)
                await myFormData.append("working_hour", fields.working_hour)
                if (files.image){
                    await myFormData.append("image", fs.createReadStream(files.image.filepath), `${files.image.originalFilename}`)
                }
                const data = await axios.put(`${process.env.SERVER_URL}/accounts/profile/update/`, myFormData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
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
