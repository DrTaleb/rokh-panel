import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {useContext, useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import axios from "axios";
import Nprogress from "nprogress";
import {useRouter} from "next/router";
import AuthContext from "@/contexts/authContext";

export default function Answer({data}) {

    const {userData} = useContext(AuthContext)
    const adminId = userData.user_id
    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none"} underline="hover" key="1" color="inherit" href={"/admin/tickets"}>
            تیکت ها
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            پاسخ به تیکت
        </Typography>,
    ];


    // form input -----------------------------------
    const [text, setText] = useState(data.answer ? data.answer : "")
    const [textError, setTextError] = useState(false)

    const textHandler = (event) => {
        setText(event.target.value)
        event.target.value.length ? setTextError(false) : setTextError(true)
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (textError) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا پاسخ را پر کنید",
            })
        } else {
            try {
                const res = await fetch(`${process.env.LOCAL_URL}/api/admin/tickets/${router.query.ticketId}`, {
                    method: "POST",
                    body : JSON.stringify({
                        id : adminId,
                        answer : text
                    })
                })
                const data = await res.json()
                Nprogress.done()
                if (data.message === "answer created") {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "پاسخ ارسال شد",
                    })
                    router.push("/admin/tickets")
                } else {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'error',
                        text: "مشکلی در سرور ایجاد شده",
                    })
                }
            } catch {
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

                <Col xs={11} sm={11} md={8} lg={7} xl={7} className={"shadow-sm bg-white"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                            <div className={"w-75"}>
                                <span className={"align-self-start text-secondary"}>
                                پیام کاربر :
                                </span>
                                <p className={"align-self-start border border-1 border-warning rounded-1 py-4 px-2 mt-2"}>
                                    {data.comment}
                                </p>
                            </div>
                            <div className={"w-75"}>
                                <span className={"align-self-start text-secondary"}>
                                پاسخ شما :
                            </span>
                                <TextField
                                    className={"w-100 mt-2"}
                                    label="متن"
                                    variant="outlined"
                                    multiline
                                    error={textError}
                                    disabled={!!data.answer}
                                    value={text}
                                    onInput={(event) => textHandler(event)}/>
                                {
                                    !data.answer &&
                                        <Button onClick={submitHandler} className={"col-5 mt-5 align-self-end"} variant={"contained"}
                                                color={"success"}>ارسال پاسخ</Button>

                                }
                            </div>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}

export async function getServerSideProps(context) {
    const {params, req} = context
    const userToken = req.cookies.userToken
    const response = await fetch(`${process.env.SERVER_URL}/page/tickets/${params.ticketId}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Token ${userToken}`
        },
    })
    const data = await response.json()
    return {
        props: {data}
    }
}