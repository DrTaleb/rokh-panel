import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useContext, useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Link from "next/link";
import {Badge} from "react-bootstrap";
import {Button} from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AuthContext from "@/contexts/authContext";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'name', label: 'نام', minWidth: 170, align: "left"},
    {id: 'mobile', label: 'موبایل', minWidth: 170, align: 'left',},
    {id: 'is_active', label: 'وضعیت', minWidth: 170, align: 'left',},
];

export default function Admins({data}) {

    const {refresh} = useContext(AuthContext)
    const [DATA, setDATA] = useState(data)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [getData, setGetData] = useState(false)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    function createData(id, name, mobile, is_superuser, is_active, options) {
        return {id, name, mobile, is_superuser, is_active, options};
    }

    const rows = [];
    const asyncFunc = ()=>{
         refresh()
         DATA.map(item => rows.push(createData(`${item.id}`, `${item.username}`, `${item.phone ? item.phone : "وارد نشده"}`, `${item.is_superuser}`, `${item.is_active ? "فعال" : "غیر فعال"}`),))
    }
    asyncFunc()
    const dataFetch = async () => {
        await fetch(`${process.env.LOCAL_URL}/api/admin/admins`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            setDATA(data)
            console.log(data)
        })
    }
    useEffect(() => {
        dataFetch()
    }, [getData])


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target);
        setPage(0);
    };
    const deleteHandler = async (id) => {
        Swal.fire({
            text: "آیا از غیر فعال کردن کارمند مورد نظر اطمینان دارید؟",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/api/admin/admins/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()).then(data => {
                    console.log(data)
                    if (data.message === "this user now is not active") {
                        Swal.fire({
                            text: "کارمند غیر فعال شد",
                            icon: 'success',
                        })
                        setGetData(!getData)
                    } else if (data.message === "this user is already not active") {
                        Swal.fire({
                            text: "این کارمند از قبل در حالت غیر فعال بوده است",
                            icon: 'error',
                        })
                        setGetData(!getData)
                    } else {
                        Swal.fire({
                            text: "مشکلی پیش آمده",
                            icon: 'error',
                        })
                    }
                })

            }
        })
    }
    const activeHandler = async (id) => {
        Swal.fire({
            text: "آیا از فعال کردن مجدد کارمند مورد نظر اطمینان دارید؟",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/api/admin/admins/active/${id}`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()).then(data => {
                    console.log(data)
                    if (data.message === "user changed") {
                        Swal.fire({
                            text: "کارمند فعال شد",
                            icon: 'success',
                        })
                        setGetData(!getData)
                    } else {
                        Swal.fire({
                            text: "مشکلی پیش آمده",
                            icon: 'error',
                        })
                    }
                })

            }
        })
    }


    return (
        <div className={"px-4"}>
            <Paper className={"p-3"} sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                <Link href={"/admin/admins/add-admin"}>
                    <Button className={"ps-2"} variant={"contained"} color={"success"}>افزودن ادمین و پزشک</Button>
                </Link>
                <TableContainer sx={{maxHeight: 600}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    گزینه ها
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}
                                                               className={"fw-bold"}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align={"left"}>
                                                {row.is_superuser === "true" ? <Badge bg="success">ادمین اصلی</Badge> :
                                                    row.is_active === "فعال" ?
                                                        <IconButton color={"error"}
                                                                    onClick={() => deleteHandler(row.id)}
                                                        >
                                                            <BlockIcon></BlockIcon>
                                                        </IconButton>
                                                        :
                                                        <Button color={"success"}
                                                                onClick={() => activeHandler(row.id)}
                                                        >
                                                            فعال سازی مجدد
                                                        </Button>

                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                        ;
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage={"تعداد آیتم در هر صفحه"}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}


export async function getServerSideProps(context) {
    const {req} = context
    const accessToken = req.cookies.accessToken
    // admins list
    const dataResponse = await fetch(`${process.env.SERVER_URL}/page/admins/`, {
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