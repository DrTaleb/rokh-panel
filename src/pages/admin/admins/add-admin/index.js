import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {
    Alert,
    Breadcrumbs,
    Button, FormControl,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Switch
} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import MenuItem from "@mui/material/MenuItem";
import {ErrorOutline, Visibility, VisibilityOff} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export default function AddAdmin() {
    // mui password show / hide
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // end
    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none text-dark"} underline="hover" key="1" color="inherit" href={"/admin/admins"}>
            کارکنان
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن کارمند
        </Typography>,
    ];
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
    const [username , setUsername] = useState("")
    const [usernameError, setUsernameError] = useState(true)
    const [password , setPassword] = useState("")
    const [passwordError , setPasswordError] = useState(true)
    const [status, setStatus] = useState({
        is_doctor: false,
        is_staff: false,
    });
    const [statusError , setStatusError] = useState(false)
    useEffect(()=>{
        !status.is_doctor && !status.is_staff ? setStatusError(true) : setStatusError(false)
    },[status])
    useEffect(()=>{
        password.length >= 8? setPasswordError(false) : setPasswordError(true)
    },[password])

    const usernameHandler = (event)=> {
        setUsername(event.target.value)
        event.target.value.length >= 4 ? setUsernameError(false) : setUsernameError(true)
    }
    const passwordHandler = (event)=>{
        setPassword(event.target.value)
    }

    const statusHandler = (event) => {
        setStatus({
            ...status,
            [event.target.name]: event.target.checked,
        });
    };

    const submitHandler = async (event) =>{
        event.preventDefault()
        if (usernameError || passwordError || statusError){
            Swal.fire({
                icon: 'error',
                text: "لطفا فیلد ها را به درستی پر کنید",
            })
        }else {
            await fetch(`${process.env.LOCAL_URL}/api/admin/admins`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username : username,
                    password : password,
                    password2 : password,
                    is_doctor : status.is_doctor,
                    is_staff : status.is_staff
                })
            }).then(res => res.json()).then(data => {
                if (data.message === "user created"){
                    Swal.fire({
                        icon: 'success',
                        text: "با موفقیت ثبت شد",
                    })
                    router.push("/admin/admins")
                }else if(data.message === "this user is already staff") {
                    Swal.fire({
                        icon: 'error',
                        text: "این کاربر جزو کارمندان است",
                    })
                }else {
                    Swal.fire({
                        icon: 'error',
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
                            label="نام کاربری"
                            variant="outlined"
                            error={usernameError}
                            value={username}
                            onInput={(event)=> usernameHandler(event)}/>
                        <FormControl sx={{width: '75%'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">پسوورد</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(event) => passwordHandler(event)}
                                error={passwordError}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <div className={"d-flex flex-column alig-center gap-2 w-75 p-2 bg-light shadow-sm"}>
                            <span>
                                 کادر تعیین ویژگی های اکانت
                            </span>

                            <FormControlLabel
                                label="ادمین سایت"
                                control={
                                    <Switch checked={status.is_staff} onChange={statusHandler} name="is_staff" />
                                }
                            />
                            <FormControlLabel
                                label="دارای پروفایل پزشکی"
                                control={
                                    <Switch checked={status.is_doctor} onChange={statusHandler} name="is_doctor" />
                                }
                            />
                            {
                                statusError &&
                                    <Alert color={"error"} icon={<ErrorOutline/>}>
                                        اکانت کارمند باید حداقل یکی از ویژگی های پروفایل پزشکی یا ادمین سایت را داشته باشد
                                    </Alert>
                            }
                            {
                                status.is_doctor && !status.is_staff &&
                                <Alert color={"success"}>
                                    طبق انتخاب شما این اکانت دارای پروفایل پزشکی است و فقط توانایی تغییر در پروفایل خود را دارد
                                </Alert>
                            }
                            {
                                !status.is_doctor && status.is_staff &&
                                <Alert color={"success"}>
                                    طبق انتخاب شما این اکانت به عنوان ادمین ثبت شده است و پروفایل پزشکی ندارد
                                </Alert>
                            }
                            {
                                status.is_doctor && status.is_staff &&
                                <Alert color={"success"}>
                                    طبق انتخاب شما این اکانت هر دو ویژگی ادمین و پروفایل پزشکی را داراست
                                </Alert>
                            }
                        </div>
                        <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"} color={"success"}>افزودن</Button>
                    </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}