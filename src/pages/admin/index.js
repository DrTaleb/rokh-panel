
import AddTaskIcon from "@mui/icons-material/AddTask";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";


export default function admin({data}){

    return(
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
                <div
                    className="panel-statistic-card-section d-flex flex-row flex-wrap gap-3 gap-lg-0 px-md-4 px-1">
                    <div className="panel-statistic-card col-lg col-sm-5 col-12 panel-statistic-card-main">
                            <span className="text-secondary">
                                تعداد کاربر
                            </span>
                        <span className="fw-bolder">
                                {data.user_count}
                            </span>
                    </div>
                    <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-danger">
                            <span className="text-secondary">
                                تعداد ادمین
                            </span>
                        <span className="fw-bolder">
                                {data.admin_count}
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
                <div className="d-flex flex-row flex-wrap gap-3">
                    <div className="col d-flex flex-column gap-3">
                        <div className="col d-flex flex-row flex-wrap gap-3">
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            فرم های در انتظار پاسخ
                                        </span>
                                    <span  className={"panel-card-icon p-2 rounded"}>
                                       <AddTaskIcon></AddTaskIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        {data.form_count}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex flex-row flex-wrap gap-3">

                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            تیکت ها
                                        </span>

                                    <span  className={"panel-card-icon p-2 rounded"}>
                                       <ConnectWithoutContactIcon></ConnectWithoutContactIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        {data.ticket_count}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-table-card card border-0 col-lg-8 col-12">
                        <div className="card-body">
                            <div
                                className="d-flex flex-row align-items-center mt-4 mt-md-0">
                                <div className="panel-title-parent w-100">
                                    <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize header-title text-secondary">
                                        نمودار بازدید سایت به تفکیک روز
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {
const {req} = context
const userToken = req.cookies.userToken
// admins list
const dataResponse = await fetch(`${process.env.SERVER_URL}/page/home/`,{
    method : "GET",
    headers : {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization' : `Token ${userToken}`
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