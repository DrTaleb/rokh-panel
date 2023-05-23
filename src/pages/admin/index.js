import AddTaskIcon from "@mui/icons-material/AddTask";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import {useContext, useEffect, useState} from "react";
import AuthContext from "@/contexts/authContext";
import Avatar from "@mui/material/Avatar";
import {Button} from "@mui/material";
import {Badge} from "react-bootstrap";
import Table from "@mui/material/Table";
import Link from "next/link";
import {error} from "next/dist/build/output/log";


export default function Admin({data}) {

    const {userData} = useContext(AuthContext)

    console.log(userData)
    const [role, setRole] = useState("")

    useEffect(() => {
        if (userData.is_superuser && userData.is_doctor) {
            setRole("ادمین اصلی و پزشک")
        } else if (userData.is_superuser) {
            setRole("ادمین اصلی")
        } else if (userData.is_staff && userData.is_doctor) {
            setRole("ادمین و پزشک")
        } else if (userData.is_doctor) {
            setRole("پزشک")
        }
    }, [userData])
    return (
        <div className="panel-content-sec-one flex-wrap px-md-4 px-1 container">
            <div className="panel-content-sec-one-right gap-4 panel-w-right-content pe-md-4 order-1 order-md-0">
                <div className="d-flex flex-row align-items-center mt-4 mt-md-0">
                    <div className="panel-title-parent w-100">
                        <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                            داشبورد مدیریت کلینیک زیبایی رخ
                        </h5>
                    </div>
                    <span className=" ms-2">
                            <i className="fa fa-angle-down text-secondary"></i>
                        </span>
                </div>
                {
                    userData.is_staff &&
                    <div
                        className="panel-statistic-card-section d-flex flex-row flex-wrap gap-3 gap-lg-0 px-md-4 px-1">
                        <div className="panel-statistic-card col-lg col-sm-5 col-12 panel-statistic-card-main">
                            <span className="text-secondary">
                                تعداد پزشک
                            </span>
                            <span className="fw-bolder">
                                {data.doctor}
                            </span>
                        </div>
                        <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-danger">
                            <span className="text-secondary">
                                تعداد ادمین
                            </span>
                            <span className="fw-bolder">
                                {data.admin}
                            </span>
                        </div>
                        <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-warning">
                            <span className="text-secondary">
                                تعداد بلاگ
                            </span>
                            <span className="fw-bolder">
                                {data.post_count}
                            </span>
                        </div>
                        <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-main">
                            <span className="text-secondary">
                                میانگین بازدید در روز
                            </span>
                            <span className="fw-bolder">
                                {data.request_per_day}
                        </span>
                        </div>
                    </div>
                }
                <div className="d-flex flex-row flex-wrap gap-3">
                    <div className="col d-flex flex-column gap-3">
                        <div className="col d-flex flex-row flex-wrap gap-3">
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            مشخصات شما
                                        </span>

                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <ConnectWithoutContactIcon></ConnectWithoutContactIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-column justify-content-between">
                                    <div className="d-flex flex-row align-items-center gap-2">
                                        <Avatar sx={{width: 50, height: 50, color: "#fff"}}></Avatar>
                                        <div className={"d-flex flex-column justify-content-end"}>
                                            <span className={"text-secondary fw-bolder px-2"}>
                                               {userData.username}
                                            </span>
                                        </div>
                                    </div>
                                    <table className={"table mt-2"}>
                                        <tbody>
                                        <tr>
                                            <td>نام کاربری</td>
                                            <td>
                                                {userData.username}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>نوع حساب</td>
                                            <td>{role}</td>
                                        </tr>
                                        <tr>
                                            <td>وضعیت اکانت</td>
                                            <td>
                                                <Badge bg={"success"}>فعال</Badge>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {
                                userData.is_doctor &&
                                <div
                                    className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                    <span className="fw-bolder text-secondary">
                                        تب های پروفایل پزشکی
                                    </span>
                                        <span className={"panel-card-icon p-2 rounded"}>
                                       <ConnectWithoutContactIcon></ConnectWithoutContactIcon>
                                    </span>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span>
                                            پروفایل شما :
                                        </span>
                                        <Link href={"/admin/profile-edit"}>
                                            <Button variant={"contained"}>
                                                مشاهده پروفایل پزشکی
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span>
                                            نمونه کار های شما :
                                        </span>
                                        <Link href={"/admin/example"}>
                                            <Button variant={"contained"}>
                                                مشاهده و تغییر نمونه کار ها
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            }
                            {
                                userData.is_staff &&
                                <div
                                    className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                    <span className="fw-bolder text-secondary">
                                        تیکت های پاسخ داده نشده
                                    </span>
                                        <span className={"panel-card-icon p-2 rounded"}>
                                       <ConnectWithoutContactIcon></ConnectWithoutContactIcon>
                                    </span>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <h4 className="fw-bold mt-4">
                                            {Number(data.ticket_count) > 0 ?
                                            <Badge bg={"danger"} >{data.ticket_count}</Badge>
                                            :
                                                <Badge bg={"success"} >هیچ تیکت جدیدی وجود ندارد</Badge>
                                            }
                                        </h4>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                    <span className="fw-bolder text-secondary">
                                        لیست تیکت ها
                                    </span>
                                        <span className={"panel-card-icon p-2 rounded"}>
                                       <ConnectWithoutContactIcon></ConnectWithoutContactIcon>
                                    </span>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <h4 className="fw-bold mt-4">
                                            <Link href={"/admin/example"}>
                                                <Button variant={"contained"}>
                                                    مشاهده لیست تیکت ها
                                                </Button>
                                            </Link>
                                        </h4>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const {req} = context
    const accessToken = req.cookies.accessToken
// admins list
    const dataResponse = await fetch(`${process.env.SERVER_URL}/page/home/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await dataResponse.json()
    if (!data) {
        return {
            notFound: true
        }
    } else {
        return {
            props: {data}
        }
    }
}