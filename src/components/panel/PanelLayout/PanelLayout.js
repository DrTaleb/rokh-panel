import {Badge, Box, Button, IconButton, Tooltip} from "@mui/material";
import {useContext, useRef, useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import GridViewIcon from '@mui/icons-material/GridView';
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import {useRouter} from "next/router";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import SettingsIcon from '@mui/icons-material/Settings';
import AuthContext from "@/contexts/authContext";

export default function PanelLayout({children}) {


    const userData = {}
    // const {userData, logOut} = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);
    const [profileOpener, setProfileOpener] = useState();
    const opener = Boolean(profileOpener);
    const handleClick = (event) => {
        setAnchorEl(event.target);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const profileClickHandler = (event) => {
        setProfileOpener(event.target);
    };
    const profileClose = () => {
        setProfileOpener(null);
    };
    const toggleElement = useRef()
    const responsiveMenu = useRef()
    const menuClick = () => {
        toggleElement.current.classList.toggle("active");
        responsiveMenu.current.classList.toggle("active");
    }
    const router = useRouter()
    const routerPath = router.pathname
    return (
        <main className={"panel-body"}>
            <nav className="navbar navbar-expand bg-main-blue py-1 fixed-top">
                <div className="container-fluid">
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="panel-menu-icon active d-flex flex-column justify-content-center rounded"
                             onClick={menuClick} ref={toggleElement}>
                            <MenuIcon sx={{color: "var(--white)"}}></MenuIcon>
                        </div>
                        <a className="text-decoration-none text-white" href="#">پنل مدیریت هانوسا</a>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-4">
                        <Menu
                            anchorEl={profileOpener}
                            id="account-menu"
                            open={opener}
                            onClose={profileClose}
                            onClick={profileClickHandler}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 2,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                },
                            }}
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={handleClose}>
                                <Avatar/> ورود به پنل کاربری
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Settings fontSize="small"/>
                                </ListItemIcon>
                                تنظیمات اکانت
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                خروج از حساب
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </nav>
            <div className="parent d-flex flex-row flex-wrap">
                <div className="panel-navigation-menu panel-w-sidebar panel-w-sidebar-sm" ref={responsiveMenu}>
                    <div className="panel-side-bar col-12 position-relative d-lg-flex">
                        <div className="panel-nav-item-parent col-12 d-flex flex-column ps-3 mt-5 mt-sm-2">
                            <div className="panel-menu-items-parent col-12">
                                <div className="service-section-opener d-flex flex-row">
                                    <div className="panel-title-parent w-100">
                                        <span
                                            className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                           گزینه های دسترسی
                                        </span>
                                    </div>
                                    <span className="mt-1 ms-2">
                                   <i className="fa fa-angle-down text-secondary"></i>
                                </span>
                                </div>
                                <Link href={"/admin"}
                                      className={`panel-side-bar-item text-decoration-none text-dark rounded gap-4 ps-3 ${routerPath.length === 6 && "active"}`}
                                >
                                    <GridViewIcon
                                        className={`${routerPath.length === 6 && "text-danger"}`}></GridViewIcon>
                                    <span className="text-secondary">داشبورد</span>
                                </Link>
                                {userData.is_superuser &&
                                    <Link href={"/admin/admins"}
                                          className={`panel-side-bar-item text-decoration-none text-dark rounded gap-4 ps-3 ${routerPath.includes("admins") && "active"}`}
                                    >
                                        <AdminPanelSettingsIcon
                                            className={`${routerPath.includes("admins") && "text-danger"}`}></AdminPanelSettingsIcon>
                                        <span className="text-secondary">لیست ادمین ها</span>
                                    </Link>
                                }
                                <Link href={"/admin/sliders"}
                                      className={`panel-side-bar-item text-decoration-none text-dark rounded gap-4 ps-3 ${routerPath.includes("sliders") && "active"}`}>
                                    <LinearScaleIcon
                                        className={`${routerPath.includes("sliders") && "text-danger"}`}
                                    ></LinearScaleIcon>
                                    <span className="text-secondary">اسلایدر ها</span>
                                </Link>
                                <Link href={"/admin/menus"}
                                      className={`panel-side-bar-item text-decoration-none text-dark rounded gap-4 ps-3 ${routerPath.includes("menus") && "active"}`}>
                                    <MenuIcon
                                        className={`${routerPath.includes("menus") && "text-danger"}`}
                                    ></MenuIcon>
                                    <span className="text-secondary">منو ها</span>
                                </Link>
                                {/*<Link href={"/admin/categories"}*/}
                                {/*      className={`panel-side-bar-item text-decoration-none text-dark rounded gap-4 ps-3 ${routerPath.includes("categories") && "active"}`}>*/}
                                {/*    <ReceiptLongIcon*/}
                                {/*        className={`${routerPath.includes("categories") && "text-danger"}`}*/}
                                {/*    ></ReceiptLongIcon>*/}
                                {/*    <span className="text-secondary">فرم ها</span>*/}
                                {/*</Link>*/}
                                <Link href={"/admin/posts"}
                                      className={`panel-side-bar-item text-decoration-none text-dark rounded gap-4 ps-3 ${routerPath.includes("posts") && "active"}`}>
                                    <ListAltIcon
                                        className={`${routerPath.includes("posts") && "text-danger"}`}
                                    ></ListAltIcon>
                                    <span className="text-secondary">پست ها</span>
                                </Link>
                                <Link href={"/admin/tickets"}
                                      className={`panel-side-bar-item text-decoration-none text-dark rounded gap-4 ps-3 ${routerPath.includes("tickets") && "active"}`}>
                                    <ConnectWithoutContactIcon
                                        className={`${routerPath.includes("tickets") && "text-danger"}`}
                                    ></ConnectWithoutContactIcon>
                                    <span className="text-secondary">تیکت ها</span>
                                </Link>
                                {userData.is_superuser &&
                                <Link href={"/admin/setting"}
                                      className={`panel-side-bar-item text-decoration-none text-dark rounded gap-4 ps-3 ${routerPath.includes("setting") && "active"}`}>
                                    <SettingsIcon
                                        className={`${routerPath.includes("setting") && "text-danger"}`}
                                    ></SettingsIcon>
                                    <span className="text-secondary">تنظیمات اصلی</span>
                                </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-content panel-w-content">
                    <nav className="bg-white py-3 shadow-sm">
                        <div className="container">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <div className="d-flex flex-row align-items-center gap-2">
                                    <Badge badgeContent={userData.is_superuser === true ? "ادمین" : "کارمند"}
                                           color="success">
                                        <Avatar sx={{width: 42, height: 42, color: "#fff"}}></Avatar>
                                    </Badge>
                                    <span className={"text-secondary"}>
                                        {userData.name}
                                    </span>
                                </div>
                                <>
                                    <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                                        <Tooltip title="منوی دسترسی">
                                            <Badge badgeContent={userData.name === null ? 1 : 0} color="error">
                                                <Button
                                                    color={"error"}
                                                    variant={"contained"}
                                                    onClick={handleClick}
                                                    sx={{ml: 2}}
                                                    aria-controls={open ? 'account-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}>تنظیمات اکانت</Button>
                                            </Badge>
                                        </Tooltip>
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 3,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -1.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 62,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <Badge badgeContent={userData.is_staff && "ادمین"} color="success">
                                                    <Avatar sx={{width: 32, height: 32}}></Avatar>
                                                </Badge>
                                            </ListItemIcon>
                                            {userData.name}
                                        </MenuItem>
                                        <Divider/>
                                        <MenuItem onClick={handleClose}>
                                            <Link href={"/"}
                                                  className={"text-dark text-decoration-none d-flex flex-row align-items-center"}>
                                                <ListItemIcon>
                                                    <AdminPanelSettingsIcon color={"error"} fontSize="medium"/>
                                                </ListItemIcon>
                                                صفحه اصلی
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link href={"/account-setting"}
                                                  className={"text-dark text-decoration-none"}>
                                                <ListItemIcon>
                                                    <Badge badgeContent={userData.name === null ? 1 : 0} color="error">
                                                        <Settings color={"error"} fontSize="small"/>
                                                    </Badge>
                                                </ListItemIcon>
                                                تنظیمات اکانت
                                            </Link>
                                        </MenuItem>
                                        <MenuItem
                                            // onClick={logOut}
                                        >
                                            <ListItemIcon>
                                                <Logout color={"error"} fontSize="small"/>
                                            </ListItemIcon>
                                            خروج از اکانت
                                        </MenuItem>
                                    </Menu>
                                </>
                            </div>
                        </div>
                    </nav>
                    {children}
                </div>
            </div>
        </main>
    )
}