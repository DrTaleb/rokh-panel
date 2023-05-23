import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import axios from "axios";
import Nprogress from "nprogress";
import {useRouter} from "next/router";

export default function ExampleId({data, exData}) {
    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none"} underline="hover" key="1" color="inherit" href={"/admin/example"}>
            نمونه کار ها
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            ویرایش نمونه کار
        </Typography>,
    ];
    const [expertiseList, setExpertiseList] = useState(exData)
    const [expertise, setExpertise] = useState(data.expertise)
    const expertiseHandler = (event)=>{
        setExpertise(event.target.value)
    }


    console.log(data.expertise)

    let exList = []
    useEffect(()=>{
        expertiseList.length && expertiseList.map(item => exList.push({label : item.title,value : item.id}))
    },[expertise])



    // form input -----------------------------------
    const [title, setTitle] = useState(data.text)
    const [titleError, setTitleError] = useState(false)

    const titleHandler = (event) => {
        setTitle(event.target.value)
        event.target.value.length ? setTitleError(false) : setTitleError(true)
    }

    const [file, setFile] = useState(null);
    const formData = new FormData();
    const handleChange = (file) => {
        setFile(file);
    };
    console.log(data)

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError ) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
            Nprogress.done()
        } else {
            await formData.append("title", title);
            await formData.append("expertise", expertise)
            if (file){
                await formData.append("image", file)
            }
            try {
                const res = await axios.put(`${process.env.LOCAL_URL}/api/admin/example/edit/${router.query.exampleId}`,formData,{headers : {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.data.id){
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "تخصص تشکیل شد",
                    })
                    router.push("/admin/example")
                }else {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'error',
                        text: "مشکلی در سرور ایجاد شده",
                    })
                }
            }catch{
                Nprogress.done()
                await Swal.fire({
                    icon: 'error',
                    text: "مشکلی در سرور ایجاد شده",
                })
            }
            Nprogress.done()

        }

    }
    const fileTypes = ["JPG", "PNG", "WEBP"];
    return (
        <Container>
            <Breadcrumbs className={"ms-4"} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <div className={"d-flex flex-row justify-content-center mt-4"}>

                <Col xs={11} sm={11} md={8} lg={6} xl={5} className={"shadow-sm bg-white"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                            <TextField
                                className={"w-75"}
                                label="متن کوتاه"
                                variant="outlined"
                                error={titleError}
                                value={title}
                                onInput={(event) => titleHandler(event)}/>
                            <TextField
                                select
                                label="نوع تخصص"
                                className={"w-75"}
                                value={expertise}
                                onChange={expertiseHandler}
                            >
                                {expertiseList.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <span>
                                عکس قبل :
                            </span>
                            <img className={"w-25"} src={data.image}/>

                            <label>در صورت تمایل به تغییر ٬عکس مورد نظر را وارد کنید</label>
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes}
                                          label={"کلیک کنید"}/>
                            <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"}
                                    color={"success"}>افزودن</Button>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}
export async function getServerSideProps (context){
    const {params,req} = context
    const accessToken = req.cookies.accessToken
    const response = await fetch(`${process.env.SERVER_URL}/page/example/${params.exampleId}`,{
        method : "GET",
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : `Bearer ${accessToken}`
        },
    })
    const exRes = await fetch(`${process.env.SERVER_URL}/accounts/profile/`,{
        method : "GET",
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : `Bearer ${accessToken}`
        },
    })
    const exDatas = await exRes.json()
    const exData = await exDatas.expertise
    const data = await response.json()
    return{
        props : {data , exData}
    }

}