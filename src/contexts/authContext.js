import {createContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const router = useRouter()
    const refresh = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/auth/refresh`)
        const data = await res.json()
        if (!data.status) {
            if (!router.pathname.startsWith("/login")) {
                // router.push(`${process.env.LOCAL_URL}/login`)
            }
        }
        return data.status
    }
    const [userData , setUserData] = useState({});
    const userInfo = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/auth/userInfo`)
        const data = await res.json()
        if (data.status) {
            await refresh()
            setUserData(data.data)
        } else {
            await refresh()
        }
    }

    const logOut = async () => {
        let massage
        await fetch(`${process.env.LOCAL_URL}/api/auth/logout`, {
            method: "POST",
        }).then(res => res.json()).then(data => massage = data)
        router.push("/")
        return massage
    }
    const asyncFunc = async ()=>{
        await userInfo()
    }
    useEffect(() => {
       asyncFunc()
    },[router.pathname])
    refresh()





    return (

        <AuthContext.Provider
            value={{refresh,userData,logOut}}
        >
            {refresh() && children}
        </AuthContext.Provider>
    )

}
export default AuthContext