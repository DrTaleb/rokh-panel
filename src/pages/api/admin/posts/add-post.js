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
    if (req.method === "POST") {
       try {
           const form = formidable({multiples: false});
           await form.parse(req, async (err, fields, files) => {
               var myFormData = new FormData();
               await myFormData.append("title", fields.title)
               await myFormData.append("sub_title", fields.sub_title)
               await myFormData.append("text", fields.text)
               await myFormData.append("status", fields.status)
               await myFormData.append("id", fields.id)
               await myFormData.append("image", fs.createReadStream(files.image.filepath), `${files.image.originalFilename}`)
               console.log(myFormData)
               const data = await axios.post(`${process.env.SERVER_URL}/page/posts/`, myFormData, {
                   headers: {
                       'Authorization': `Token ${userToken}`,
                       'Content-Type': 'multipart/form-data'
                   },
               })
               console.log(data.data)
               res.status(200).json(data.data)
           })
       }catch {
           res.status(500).json({massage : "ارور سرور"})
       }
    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
