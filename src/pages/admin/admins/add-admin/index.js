import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import {useRouter} from "next/router";

export default function AddAdmin() {
    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none text-dark"} underline="hover" key="1" color="inherit" href={"/admin/admins"}>
            ادمین ها
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن ادمین
        </Typography>,
    ];


    // form input -----------------------------------
    const [mobile , setMobile] = useState("")
    const [mobileError, setMobileError] = useState(true)
    const mobileHandler = (event)=> {
        setMobile(event.target.value)
        event.target.value.length === 11 && event.target.value[0] == 0 &&  event.target.value[1] == 9 ? setMobileError(false) : setMobileError(true)
    }

    const submitHandler = async (event) =>{
        event.preventDefault()
        if (mobileError){
            Swal.fire({
                icon: 'error',
                text: "لطفا فیلد را به درستی پر کنید",
            })
        }else {
            await fetch(`${process.env.LOCAL_URL}/api/admin/admins`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile : mobile
                })
            }).then(res => res.json()).then(data => {
                if (data.massage.message === "this user now is staff"){
                    Swal.fire({
                        icon: 'success',
                        text: "با موفقیت ثبت شد",
                    })
                    router.push("/admin/admins")
                }else if(data.massage.message === "this user is already staff") {
                    Swal.fire({
                        icon: 'error',
                        text: "این کاربر جزو کارمندان است",
                    })
                }else if(data.massage.message === "mobile not exist"){
                    Swal.fire({
                        icon: 'error',
                        text: "این کاربر در وبسایت ثبت نام نکرده است",
                    })
                }else {
                    Swal.fire({
                        icon: 'warning',
                        text: "دوباره تلاش کنید",
                    })
                }
            })
        }

    }
    return (
        <Container>
            <Breadcrumbs className={"ms-4"} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <div className={"d-flex flex-row justify-content-center"}>

                <Col xs={11} sm={11} md={8} lg={6} xl={5} className={"content bg-white shadow-sm"}>
                    <form>
                    <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                        <TextField
                            className={"w-75"}
                            label="شماره تلفن ادمین جدید"
                            variant="outlined"
                            error={mobileError}
                            value={mobile}
                            onInput={(event)=> mobileHandler(event)}/>
                        <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"} color={"success"}>افزودن</Button>
                    </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}