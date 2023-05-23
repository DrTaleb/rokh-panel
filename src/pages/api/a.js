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
    if (req.method === "POST") {
        try {
            const form = formidable({multiples: false});
            await form.parse(req, async (err, fields, files) => {
                console.log(files)
                var myFormData = new FormData();
                await myFormData.append("post", 1)
                myFormData.append("image", fs.createReadStream(files.upload.filepath), `${files.upload.originalFilename}`)
                // console.log(myFormData)
                const data = await axios.post(`${process.env.SERVER_URL}/page/test/`, myFormData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                res.status(200).json({
                    uploaded:true,
                    url: `${process.env.SERVER_URL}`
                })
            })
        }catch {
            res.status(500).json({massage : "ارور سرور"})
        }

    } else if (req.method === "DELETE") {
       console.log("dtxdxdszsdzsz")

    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}