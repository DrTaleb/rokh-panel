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
    if (req.method === "PUT") {
        try {
            const form = formidable({multiples: false});
            await form.parse(req, async (err, fields, files) => {
                var myFormData = new FormData();
                await myFormData.append("title", fields.title)
                await myFormData.append("text", fields.text)
                if (files.image){
                    myFormData.append("image", fs.createReadStream(files.image.filepath), `${files.image.originalFilename}`)
                }
                const data = await axios.put(`${process.env.SERVER_URL}/page/expertise/${req.query.expertiseId}/`, myFormData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                res.status(200).json(data.data)
            })
        }catch(err) {
            res.status(500).json({massage : "ارور سرور"})
        }
    } else {
        res.setHeader("Allow", ["put"]);
        res.status(405).json({massage: "not allowed"})
    }
}
