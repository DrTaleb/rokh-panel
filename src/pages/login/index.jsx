import bg from "./bg/img.png"
import TextField from "@mui/material/TextField";
import {Button, FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useEffect, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Link from "next/link";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {toast} from "react-toastify";
import Nprogress from "nprogress";
import {useRouter} from "next/router";
export default function Login(){

    const router = useRouter()
    // mui password show / hide
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // end
    // login form

    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [usernameError , setUsernameError] = useState(true)
    const [passwordError , setPasswordError] = useState(true)
    useEffect(()=>{
        username.length ? setUsernameError(false) : setUsernameError(true)
    },[username])

    useEffect(()=>{
        password.length ? setPasswordError(false) : setPasswordError(true)
    },[password])

    const usernameHandler = (event)=>{
        setUsername(event.target.value)
    }
    const passwordHandler = (event)=>{
        setPassword(event.target.value)
    }

    const submitHandler = async (event)=>{
        event.preventDefault()
        Nprogress.start();
        if (!passwordError || !usernameError){
            try {
                const loginRequest = await fetch(`${process.env.LOCAL_URL}/api/auth/login`,{
                    method : "POST",
                    body : JSON.stringify({
                        username,password
                    })
                })
                const loginRes = await loginRequest.json()
                if (loginRes.access){
                    await Nprogress.done()
                    await toast.success("خوش آمدید")
                    await router.replace("/")
                }else {
                    Nprogress.done()
                    toast.error("لطفا در وارد کردن اطلاعات خود دقت کنید")
                }
            }catch (err){
                console.log(err)
                toast.error("مشکلی در سرور پیش آمده")
                Nprogress.done()

            }
        }
    }


    return(
        <div className="account-pages my-5 pt-sm-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="card border-0 shadow overflow-hidden">
                            <div className="bg-login text-center"
                                 style={
                                {
                                    background : `url(${bg.src})`,
                                    padding : "60px 0px",
                                    backgroundSize : "cover",
                                    backgroundPosition : "center center",
                                    position : "relative",
                                    borderRadius : "0px 0px 50% 50%"
                                }
                            }
                            >
                                <div className="bg-login-overlay"></div>
                                <div className="position-relative">
                                    <h5 className="text-white font-size-20">خوش آمدید!</h5>
                                    <p className="text-white-50 mb-0">جهت دسترسی به پنل مدیریت وارد شوید</p>
                                    <Link href={"/"} className="logo logo-admin mt-4">
                                        <img src={"/img/logo copy.png"} alt="" height="30"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="card-body pt-5">
                                <div className="p-2">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <TextField
                                                value={username}
                                                onChange={(event) => usernameHandler(event)}
                                                className={"w-100 my-3"}
                                                label="نام کاربری"
                                                error={usernameError}
                                                type="text"
                                            />
                                            <FormControl sx={{width: '100%'}} variant="outlined">
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
                                        </div>


                                        <div className="d-flex flex-row justify-content-end mt-4">
                                            <Button variant={"contained"} color={"error"}
                                                    type="submit" onClick={submitHandler}>ورود
                                            </Button>
                                        </div>

                                        <div className="mt-4 text-center">
                                            <Link href={"/"} className="text-muted"> رمز عبور خود را فراموش کرده اید؟</Link>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <p>ارائه شده توسط تیم هانوسا
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}