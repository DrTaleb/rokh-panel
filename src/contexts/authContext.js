import {createContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";



const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const router = useRouter()
    const refresh = async ()=>{
        const res = await fetch(`${process.env.LOCAL_URL}/api/auth/refresh`)
        const data = await res.json()
        if (!data.status){
            if (!router.pathname.startsWith("/login")){
                router.replace(`${process.env.LOCAL_URL}/login`)
            }
        }
    }
    useEffect(()=>{
       refresh()
    },[])


    return (

        <AuthContext.Provider
            value={{refresh}}
        >
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContext