import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
        const [state,setState] = useState('Login')
        const {setShowLogin,backend_Url,setToken,setUser,loadCreditsData} = useContext(AppContext)

        const [name,setName] = useState('')
        const [email,setEmail] = useState('')
        const [pass,setPass] = useState('')

        const onSubmitHandler = async(e) => {
                e.preventDefault();  //prevent the webpage from reloading after submitting the form
                try {
                    if(state == 'Login'){
                        const response = await axios.post(backend_Url + '/api/user/login',{email,password:pass})
                        const login_data = response.data

                        if(login_data.success){
                            setToken(login_data.token)
                            setUser(login_data.user)
                            localStorage.setItem('token',login_data.token)
                            setShowLogin(false)
                            loadCreditsData();
                        }
                        else{
                            toast.error(login_data.message)
                        }
                    }
                    else{
                        const response = await axios.post(backend_Url + '/api/user/register',{name,email,password:pass})
                        const register_data = response.data

                        if(register_data.success){
                            setToken(register_data.token)
                            setUser(register_data.user)
                            localStorage.setItem('token',register_data.token)
                            setShowLogin(false)
                            loadCreditsData();
                        }
                        else{
                            toast.error(register_data.message)
                        }
                    }
                } catch (error) {
                    toast.error(error.message)
                }
        }

        useEffect(() =>{
            document.body.style.overflow = 'hidden';

            return () =>{
                document.body.style.overflow = 'unset';
            }
        },[])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

        <motion.form onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative bg-white p-10 rounded-lx text-slate-500 rounded-xl '>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>

           { state !== 'Login' && <div className='border px-6 py-2 flex item-center gap-2 rounded-full mt-4'>
                <img src={assets.user_icon1} alt="" />
                <input onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm' type = "text" placeholder='Full Name'required/>                                              
            </div>}

            <div className='border px-6 py-2 flex item-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" />
                <input onChange={e => setEmail(e.target.value)} value={email} className='outline-none text-sm' type = "email" placeholder='Email Id'required/>                                              
            </div>

            <div className='border px-6 py-2 flex item-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" />
                <input onChange={e => setPass(e.target.value)} value={pass} className='outline-none text-sm' type = "password" placeholder='Password'required/>                                              
            </div>

            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgort password?</p>
            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'Login' : 'Create Account'}</button>
            {state === 'Login' ?  <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')}>Signup</span></p>
            :
            <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer'onClick={()=>setState('Login')}>Login</span></p>}
            <img  onClick={()=> setShowLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
        </motion.form>
      
    </div>
  )
}

export default Login
