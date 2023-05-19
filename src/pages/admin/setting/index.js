import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import axios from "axios";
import Nprogress from "nprogress";

export default function MainSetting({data}) {
    const [getData, setGetData] = useState(false)
    const [DATA, setDATA] = useState(data)
    useEffect( ()=>{
        fetch(`${process.env.LOCAL_URL}/api/admin/setting`)
            .then(res => res.json())
            .then(data => setDATA(data))
    }, [getData])


    // form input -----------------------------------
    const [title, setTitle] = useState(DATA.name)
    const [titleError, setTitleError] = useState(false)
    const [address, setAddress] = useState(DATA.address)
    const [addressError, setAddressError] = useState(false)
    const [email, setEmail] = useState(DATA.email)
    const [emailError, setEmailError] = useState(false)
    const [number, setNumber] = useState(DATA.number)
    const [numberError, setNumberError] = useState(false)
    const [desc, setDesc] = useState(DATA.description)
    const [descError, setDescError] = useState(false)
    const titleHandler = (event) => {
        setTitle(event.target.value)
        event.target.value.length ? setTitleError(false) : setTitleError(true)
    }
    const addressHandler = (event) => {
        setAddress(event.target.value)
        event.target.value.length ? setAddressError(false) : setAddressError(true)
    }
    const emailHandler = (event) => {
        setEmail(event.target.value)
        event.target.value.includes("@") ? setEmailError(false) : setEmailError(true)
    };
    const numberHandler = (event) => {
        setNumber(event.target.value)
        event.target.value.length === 11 && event.target.value[0] == 0 ? setNumberError(false) : setNumberError(true)
    };
    const descHandler = (event) => {
        setDesc(event.target.value)
        event.target.value.length ? setDescError(false) : setDescError(true)
    }
    const [file, setFile] = useState(null);
    const formData = new FormData();
    const handleChange = (file) => {
        setFile(file);
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError || descError || addressError || numberError || emailError) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را به درستی پر کنید",
            })
        } else {

            await formData.append("name", title);
            await formData.append("description", desc)
            await formData.append("number", number)
            await formData.append("address", address)
            await formData.append("email", email)
            if (file){
                await formData.append("image", file)
            }
            try {
                const res = await axios.post(`${process.env.LOCAL_URL}/api/admin/setting`,formData,{headers : {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                console.log(res.data)
                if (res.data.message === "information updated"){
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "اطلاعات به روز شد",
                    })
                    setGetData(prevState => !prevState)
                }else {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'error',
                        text: "مشکلی ایجاد شده دوباره تلاش کنید",
                    })
                }
                Nprogress.done()
            }catch{
                Nprogress.done()
                await Swal.fire({
                    icon: 'error',
                    text: "مشکلی در سرور ایجاد شده",
                })
            }

        }

    }
    const fileTypes = ["PNG", "WEBP"];
    return (
        <Container>
            <div className={"d-flex flex-row justify-content-center mt-4"}>

                <Col xs={11} sm={11} md={8} lg={6} xl={5} className={"shadow-sm bg-white"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                            <TextField
                                className={"w-75"}
                                label="نام شرکت"
                                variant="outlined"
                                error={titleError}
                                value={title}
                                onInput={(event) => titleHandler(event)}/>
                            <TextField
                                className={"w-75"}
                                label="آدرس"
                                variant="outlined"
                                multiline
                                error={addressError}
                                value={address}
                                onInput={(event) => addressHandler(event)}/>
                            <TextField
                                className={"w-75"}
                                label="آدرس ایمیل"
                                variant="outlined"
                                type={"email"}
                                error={emailError}
                                value={email}
                                onInput={(event) => emailHandler(event)}/>
                            <TextField
                                className={"w-75"}
                                label="تلفن"
                                variant="outlined"
                                error={numberError}
                                type={"number"}
                                value={number}
                                onInput={(event) => numberHandler(event)}/>
                            <TextField
                                className={"w-75"}
                                label="توضیحات"
                                variant="outlined"
                                multiline
                                error={descError}
                                value={desc}
                                onInput={(event) => descHandler(event)}/>

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
export async function getServerSideProps (context){
    const {req} = context
    const userToken = req.cookies.userToken
    const response = await fetch(`${process.env.SERVER_URL}/page/mainsettings/`,{
        method : "GET",
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : `Token ${userToken}`
        },
    })
    const data = await response.json()
    return{
        props : {data}
    }

}