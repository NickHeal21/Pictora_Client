import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const  AppContext = createContext()

const  AppContextProvider = (props) =>{

    const [user,setUser] = useState(false) 
    const [showLogin,setShowLogin] = useState(false); 
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [credits,setCredits] = useState(false)

    const backend_Url = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const loadCreditsData = async() => {
        try {
            const {data} = await axios.get(backend_Url + '/api/user/credits',{headers:{token}})

            console.log("API Response: ", data);

            if(data.success){
                setCredits(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const generateImage = async (prompt) => {
        try {
           const {data} = await axios.post(backend_Url + '/api/image/generate-image', {prompt}, {headers: {token}})

            if(data.success){
                loadCreditsData()
                if (data.resultImage.startsWith("data:image")) {  // ✅ Check if it's a Base64 image
                    return data.resultImage;
                } else {
                    toast.error("Invalid image format received");
                    console.error("Received invalid image:", data.resultImage);
                    return null;
                }
            }else{
                toast.error(data.message) //api response
                loadCreditsData()
                if(data.creditBalance === 0){
                    navigate('/buy')
                }
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setUser(false)
    }

    useEffect(() => {
        if(token){
            loadCreditsData()
        }
    },[token])

    const Value = {
        user,setUser,showLogin,setShowLogin,backend_Url,token,setToken,credits,setCredits,loadCreditsData,logout,generateImage
    }

    return (
        <AppContext.Provider value = {Value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider