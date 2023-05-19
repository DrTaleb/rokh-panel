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

export default function AddSlider() {
    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none"} underline="hover" key="1" color="inherit" href={"/admin/sliders"}>
            اسلایدر ها
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            ویرایش اسلایدر
        </Typography>,
    ];
    const [data, setData] = useState({})
    useEffect( ()=>{
        fetch(`${process.env.LOCAL_URL}/api/admin/sliders`)
            .then(res => res.json())
            .then(data => setData(data))
    }, [])

    const statusList = [
        {
            value: 1,
            label: "فعال"
        },
        {
            value: 0,
            label: "غیر فعال"
        }
    ]
    // form input -----------------------------------
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState(true)
    const [text, setText] = useState("")
    const [textError, setTextError] = useState(true)
    const [status, setStatus] = useState("")
    const [statusError, setStatusError] = useState(true)
    const titleHandler = (event) => {
        setTitle(event.target.value)
        event.target.value.length ? setTitleError(false) : setTitleError(true)
    }
    const textHandler = (event) => {
        setText(event.target.value)
        event.target.value.length ? setTextError(false) : setTextError(true)
    }
    const statusHandler = (event) => {
        setStatus(event.target.value)
        event.target.value === 0 || event.target.value === 1 ? setStatusError(false) : setStatusError(true)
    };
    const [file, setFile] = useState(null);
    const formData = new FormData();
    const handleChange = (file) => {
        setFile(file);
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError || textError || statusError) {
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
            await formData.append("status", status)
            await formData.append("image", file)
            try {
                const res = await axios.post(`${process.env.LOCAL_URL}/api/admin/sliders/add-slider`,formData,{headers : {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.data.message === "slide created"){
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "اسلاید تشکیل شد",
                    })
                    router.push("/admin/sliders")
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
                                label="نام اسلاید"
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
                            <TextField
                                select
                                label="وضعیت"
                                error={statusError}
                                className={"w-75"}
                                onChange={statusHandler}
                                value={status}
                            >
                                {statusList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <label>عکس مورد نظر را وارد کنید</label>
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes}
                                          label={"بکشید و در این نقطه رها کنید"}/>
                            <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"}
                                    color={"success"}>افزودن</Button>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}