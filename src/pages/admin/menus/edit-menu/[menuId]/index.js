import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
// import {FileUploader} from "react-drag-drop-files";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import {useRouter} from "next/router";

export default function EditMenu({data}) {
    const router = useRouter()
    const menuId = router.query.menuId
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href={"/admin/menus"}>
            منو
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن منو
        </Typography>,
    ];

    const linkTypeList = [
        {
            value: "header",
            label: "هدر"
        },
        {
            value: "footer",
            label: "فوتر"
        }
    ]

    const [menus , setMenus] = useState([{
        label : "بدون والد",
        value : 0
    }])


    // form input -----------------------------------
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(false)
    const [link, setLink] = useState("")
    const [linkError, setLinkError] = useState(false)
    const [type, setType] = useState("")
    const [parent, setParent] = useState(0)
    const [parentDisable , setParentDisable ] = useState(false)
    let selectedMenu = data.find(item => item.id == menuId);
    useEffect(()=> {
        setName(selectedMenu.title)
        setLink(selectedMenu.link)
        setType(selectedMenu.type)
        if (selectedMenu.type === "header"){
            setMenus([{
                label : "بدون والد",
                value : 0
            }])
            data.filter(item => item.type === "header" && item.parent_id === 0).map(item => {
                setMenus((prevState)=> [...prevState ,{
                    label : item.title,value : item.id
                }
                ])
            })
            setParent(selectedMenu.parent_id)
        }else {
            setMenus([{
                label : "بدون والد",
                value : 0
            }])
            data.filter(item => item.type === "footer" && item.parent_id === 0).map(item => {
                setMenus((prevState)=> [...prevState ,{
                    label : item.title,value : item.id
                }
                ])
            })
            setParent(selectedMenu.parent_id)
        }
    },[])
    const nameHandler = (event) => {
        setName(event.target.value)
        event.target.value.length ? setNameError(false) : setNameError(true)
    }
    const linkHandler = (event) => {
        setLink(event.target.value)
        event.target.value.length ? setLinkError(false) : setLinkError(true)
    }
    const typeHandler = (event) => {
        setType(event.target.value)
        if (event.target.value === "header"){
            setMenus([{
                label : "بدون والد",
                value : 0
            }])
            data.filter(item => item.type === "header" && item.parent_id === 0).map(item => {
                setMenus((prevState)=> [...prevState ,{
                    label : item.title,value : item.id
                }
                ])
            })
            setParentDisable(false)
            console.log(menus)
        }else {
            setMenus([{
                label : "بدون والد",
                value : 0
            }])
            data.filter(item => item.type === "footer" && item.parent_id === 0).map(item => {
                setMenus((prevState)=> [...prevState ,{
                    label : item.title,value : item.id
                }
                ])
            })
            setParentDisable(false)
        }
    };
    const parentHandler = (event) => {
        setParent(event.target.value)
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        if (nameError || linkError) {
            Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
        } else {
            try {
                const res = await fetch(`${process.env.LOCAL_URL}/api/admin/menus/${selectedMenu.id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        title: name,
                        link: link,
                        parent_id: parent,
                        type : type,
                    })
                })
                const data = await res.json()
                if (data.message === "menu changed"){
                    Swal.fire({
                        icon: 'success',
                        text: "منو تغییر کرد",
                    })
                    router.push("/admin/menus")
                }else {
                    Swal.fire({
                        icon: 'error',
                        text: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
                    })
                }
            }catch (err){
                Swal.fire({
                    icon: 'error',
                    text: "مشکلی در سرور پیش آمده",
                })
            }
        }
    }
    return (
        <Container>
            <Breadcrumbs className={"ms-4"} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <div className={"d-flex flex-row justify-content-center"}>

                <Col xs={11} sm={11} md={8} lg={6} xl={5} className={"bg-white rounded-3 shadow"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                            <TextField className={"w-75"}
                                       label="نام منو"
                                       variant="outlined"
                                       value={name}
                                       error={nameError}
                                       InputLabelProps={{shrink: true}}
                                       onInput={(event) => nameHandler(event)}
                            />
                            <TextField className={"w-75"}
                                       label="لینک"
                                       variant="outlined"
                                       value={link}
                                       error={linkError}
                                       InputLabelProps={{shrink: true}}
                                       onInput={(event) => linkHandler(event)}
                            />
                            <TextField
                                select
                                label="دسته بندی"
                                className={"w-75"}
                                value={type}
                                onChange={typeHandler}
                            >
                                {linkTypeList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="والد"
                                className={"w-75"}
                                value={parent}
                                onChange={parentHandler}
                                disabled={parentDisable}
                            >
                                {menus.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"}
                                    color={"success"}>افزودن</Button>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}

export async function getServerSideProps(context){
    const {req} = context
    const layoutResponse = await fetch(`${process.env.SERVER_URL}/page/menus/`,{
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : `Bearer ${req.cookies.accessToken}`
        },
    })
    const data = await layoutResponse.json()
    return {
        props: {data}
    }
}


