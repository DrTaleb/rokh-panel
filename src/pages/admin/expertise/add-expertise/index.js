import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import axios from "axios";
import Nprogress from "nprogress";
import {useRouter} from "next/router";
import FormData from 'form-data';
export default function AddSlider() {
    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none"} underline="hover" key="1" color="inherit" href={"/admin/expertise"}>
            تخصص ها
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن تخصص
        </Typography>,
    ];


    // form input -----------------------------------
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState(true)
    const [text, setText] = useState("")
    const [textError, setTextError] = useState(true)
    const titleHandler = (event) => {
        setTitle(event.target.value)
        event.target.value.length ? setTitleError(false) : setTitleError(true)
    }
    const textHandler = (event) => {
        setText(event.target.value)
        event.target.value.length ? setTextError(false) : setTextError(true)
    }
    const [file, setFile] = useState(null);
    const formData = new FormData();
    const handleChange = (file) => {
        setFile(file);
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError || textError ) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
        } else if (!file) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا فایل را وارد کنید",
            })
        } else {
            await formData.append("title", title);
            await formData.append("text", text)
            await formData.append("image", file)
            try {
                const res = await axios.post(`${process.env.LOCAL_URL}/api/admin/expertise/add-expertise`,formData,{headers : {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.data.message === "expertise created"){
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "تخصص تشکیل شد",
                    })
                    router.push("/admin/expertise")
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
                                label="نام تخصص"
                                variant="outlined"
                                error={titleError}
                                value={title}
                                onInput={(event) => titleHandler(event)}/>
                            <TextField
                                className={"w-75"}
                                label="متن"
                                variant="outlined"
                                multiline
                                error={textError}
                                value={text}
                                onInput={(event) => textHandler(event)}/>
                            <label>عکس مورد نظر را وارد کنید</label>
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