import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import axios from "axios";
import Nprogress from "nprogress";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Avatar from "@mui/material/Avatar";
export default function ProfileEdit({data}) {

    const [getData, setGetData] = useState(false)
    const [DATA, setDATA] = useState(data)


    // form input -----------------------------------
    const [name, setName] = useState(data.name)
    const [nameError, setNameError] = useState(false)
    const [bio, setBio] = useState(data.bio)
    const [bioError, setBioError] = useState(false)
    const [pezeshkiCode, setPezeshkiCode] = useState(data.pezeshki_code)
    const [pezeshkiCodeError, setPezeshkiCodeError] = useState(false)
    const [date , setDate] = useState("")
    const [saturday , setSaturday] = useState(data.working_hour.Saturday)
    const [sunday , setSunday] = useState(data.working_hour.Sunday)
    const [monday , setMonday] = useState(data.working_hour.Monday)
    const [tuesday , setTuesday] = useState(data.working_hour.Tuesday)
    const [wednesday , setWednesday] = useState(data.working_hour.Wednesday)
    const [thursday , setThursday] = useState(data.working_hour.Thursday)
    const [friday , setFriday] = useState(data.working_hour.Friday)

    const titleHandler = (event) => {
        setName(event.target.value)
        event.target.value.length ? setNameError(false) : setNameError(true)
    }
    const bioHandler = (event) => {
        setBio(event.target.value)
        event.target.value.length ? setBioError(false) : setBioError(true)
    }
    const pezeshkiCodeHandler = (event) => {
        setPezeshkiCode(event.target.value)
        event.target.value.length >= 3 ? setPezeshkiCodeError(false) : setPezeshkiCodeError(true)
    };


    const [file, setFile] = useState(null);
    const formData = new FormData();
    const handleChange = (file) => {
        setFile(file);
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (nameError || bioError || pezeshkiCodeError || !date) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را به درستی پر کنید",
            })
            Nprogress.done()
        } else {

            await formData.append("name", name);
            await formData.append("birth_year" , date.format("YYYY-MM-DD"))
            await formData.append("bio", bio)
            await formData.append("pezeshki_code", pezeshkiCode)
            await formData.append("working_hour", {
                Saturday : saturday,
                Sunday : sunday,
                Monday : monday,
                Tuesday : tuesday,
                Wednesday : wednesday,
                Thursday : thursday,
                Friday : friday,
            })
            if (file){
                await formData.append("image", file)
            }
            try {
                const res = await axios.post(`${process.env.LOCAL_URL}/api/admin/profile-edit`,formData,{headers : {
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
            Nprogress.done()


        }

    }
    const fileTypes = ["PNG", "WEBP"];
    return (
        <Container>
            <div className={"d-flex flex-row justify-content-center mt-4"}>
                <Col xs={11} sm={11} md={8} lg={6} xl={6} className={"shadow-sm bg-white"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                            {
                                data.profile_image ?
                                    <img alt={""} className={"col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4 rounded-circle border-2 border-light"} src={data.profile_image}/>
                                    :
                                    <Avatar sx={{width: 70, height: 70, color: "#fff"}}></Avatar>
                            }
                            <TextField
                                className={"w-75"}
                                label="نام"
                                variant="outlined"
                                placeholder={"مثال : دکتر طالب"}
                                error={nameError}
                                value={name}
                                onInput={(event) => titleHandler(event)}/>
                            <TextField
                                className={"w-75"}
                                label="توضیحات کوتاه"
                                variant="outlined"
                                multiline
                                error={bioError}
                                value={bio}
                                onInput={(event) => bioHandler(event)}/>
                            <TextField
                                className={"w-75"}
                                label="شماره نظام پزشکی"
                                variant="outlined"
                                type={"text"}
                                error={pezeshkiCodeError}
                                value={pezeshkiCode}
                                onInput={(event) => pezeshkiCodeHandler(event)}/>
                            <DatePicker
                                className={"w-75"}
                                render={<Button>انتخاب تاریخ تولد</Button>}
                                inputClass={"form-control"}
                                calendar={persian}
                                locale={persian_fa}
                                value={date}
                                onChange={setDate}
                                format={"YYYY-MM-DD"}
                                plugins={[
                                    <DatePanel key={1}></DatePanel>
                                ]}
                            >
                            </DatePicker>
                            <div className={"bg-light d-flex flex-column gap-3 p-2 shadow-sm w-75"}>
                                <span className={"border-bottom border-2 align-self-start "}>
                                    ساعات حضور در مجموعه
                                </span>
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <th>شنبه</th>
                                        <td>
                                            <TextField
                                                className={"w-100"}
                                                variant="outlined"
                                                type={"text"}
                                                value={saturday}
                                                onInput={(event) => setSaturday(event.target.value)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>یکشنبه</th>
                                        <td>
                                            <TextField
                                                className={"w-100"}
                                                variant="outlined"
                                                type={"text"}
                                                value={sunday}
                                                onInput={(event) => setSunday(event.target.value)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>دوشنبه</th>
                                        <td>
                                            <TextField
                                                className={"w-100"}
                                                variant="outlined"
                                                type={"text"}
                                                value={monday}
                                                onInput={(event) => setMonday(event.target.value)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>سه شنبه</th>
                                        <td>
                                            <TextField
                                                className={"w-100"}
                                                variant="outlined"
                                                type={"text"}
                                                value={tuesday}
                                                onInput={(event) => setTuesday(event.target.value)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>چهارشنبه</th>
                                        <td>
                                            <TextField
                                                className={"w-100"}
                                                variant="outlined"
                                                type={"text"}
                                                value={wednesday}
                                                onInput={(event) => setWednesday(event.target.value)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>پنجشنبه</th>
                                        <td>
                                            <TextField
                                                className={"w-100"}
                                                variant="outlined"
                                                type={"text"}
                                                value={thursday}
                                                onInput={(event) => setThursday(event.target.value)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>جمعه</th>
                                        <td>
                                            <TextField
                                                className={"w-100"}
                                                variant="outlined"
                                                type={"text"}
                                                value={friday}
                                                onInput={(event) => setFriday(event.target.value)}/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <label> درصورت تمایل به تغییر ٬عکس پروفایل مورد نظر را وارد کنید</label>
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
    const accessToken = req.cookies.accessToken
    const response = await fetch(`${process.env.SERVER_URL}/accounts/profile/`,{
        method : "GET",
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : `Bearer ${accessToken}`
        },
    })
    const data = await response.json()
    return{
        props : {data}
    }

}