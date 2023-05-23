import Container from "react-bootstrap/Container";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

export default function slideView({data}){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const returnLastPage = ()=> {
        router.push("/admin/expertise")
    }

    console.log(data.image_url)
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
                <p>
                    عکس :
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={""} className={"col-xl-3 col-lg-4 col-sm-6 col-12 rounded mt-3"} src={`${process.env.SERVER_URL}${data.image_url}`}/>
            </div>
        </Container>
    )
}

export async function getServerSideProps (context){
    const {params,req} = context
    const accessToken = req.cookies.accessToken
    const response = await fetch(`${process.env.SERVER_URL}/page/expertise/${params.expertiseId}`,{
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