import Container from "react-bootstrap/Container";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

export default function slideView({data}){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const returnLastPage = ()=> {
        router.push("/admin/sliders")
    }

    return(
        <Container>
            <div className={"w-100"}>
                <Button variant={"outlined"} onClick={returnLastPage}>بازگشت به صفحه قبل</Button>
                <p className={"fw-bold my-3"}>
                    تایتل : {data.title}
                </p>
                <p>
                    متن : {data.text}
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={""} className={"w-100 rounded mt-3"} src={`https://storage.iran.liara.space/hanousa/static/${data.image}`}/>
            </div>
        </Container>
    )
}

export async function getServerSideProps (context){
    const {params,req} = context
    const userToken = req.cookies.userToken
    console.log(params.sliderId)
    const response = await fetch(`https://server.hanousa.ir/page/slides/${params.sliderId}`,{
        method : "GET",
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : `Token ${userToken}`
        },
    })
    const data = await response.json()
    return{
        props : {data}
    }

}