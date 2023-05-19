import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import {Button} from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";
import {useRouter} from "next/router";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'title', label: 'نام', minWidth: 170, align: "left"},
    {id: 'link', label: 'لینک', minWidth: 170, align: 'left',},
    {id: 'parentId', label: 'والد', minWidth: 170, align: 'left',},
];

export default function Menus() {

    const router = useRouter()
    const [DATA, setDATA] = useState([])
    const [getData, setGetData] = useState(false)

    useEffect(() => {
        fetch(`${process.env.LOCAL_URL}/api/admin/menus`)
            .then(res => res.json())
            .then(data => {
                setDATA(data)
            })

    }, [getData])

    function createData(id, title, link, parentId, options) {
        return {id, title, link, parentId, options};
    }

    const rows = [];
    if (DATA.length) {
        DATA.map(item => rows.push(createData(`${item.id}`, `${item.title}`, `${item.link}`, `${item.parent_name == null ?  "بدون والد": item.parent_name}`)))

    }

    const editHandler = (id) => {
        router.push(`/admin/menus/edit-menu/${id}`)
    }
    const deleteHandler = async (id) => {
        Swal.fire({
            text: "آیا از حذف آیتم مورد نظر اطمینان دارید؟",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`${process.env.LOCAL_URL}/api/admin/menus/${id}`, {
                        method: "DELETE"
                    })
                    const data = await res.json()
                    if (data.message === "menu deleted") {
                        setGetData(prev => !prev)
                        Swal.fire(
                            '',
                            "حذف با موفقیت انجام شد !",
                            'success'
                        )
                    } else {
                        Swal.fire(
                            '',
                            "مشکلی پیش آمده دوباره تلاش کنید",
                            'error'
                        )
                    }
                } catch {
                    Swal.fire(
                        '',
                        "مشکلی در سرور پیش آمده دوباره تلاش کنید",
                        'error'
                    )
                }
            }
        })
    }


    return (
        <div className={"px-4"}>
            <Paper className={"p-3"} sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                <Link href={"/admin/menus/add-menu"}>
                    <Button className={"ps-2"} variant={"contained"} color={"success"}>افزودن منو</Button>
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
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} className={"fw-bold"}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            <IconButton color={"warning"}
                                                        onClick={() => editHandler(row.id)}
                                            >
                                                <ModeEditOutlineRoundedIcon></ModeEditOutlineRoundedIcon>
                                            </IconButton>
                                            <IconButton color={"error"}
                                                        onClick={() => deleteHandler(row.id)}
                                            >
                                                <DeleteIcon></DeleteIcon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                                    ;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
