import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const LoggedUser = createContext()

export default function LoggedUserProvider({children}){
    const lsToken = localStorage.getItem('token')
    const [token, setToken] = useState(lsToken)
    
    const navigate = useNavigate()

    useEffect(()=>{
        if (!lsToken){
            navigate('/')
        } else {
            navigate('/home')
        }
    },[])

    return (
        <LoggedUser.Provider value={{token, setToken}}>
            {children}
        </LoggedUser.Provider>
    )
}