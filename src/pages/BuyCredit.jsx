import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const BuyCredit = () => {
  const {user, backend_Url, loadCreditsData, token, setShowLogin} = useContext(AppContext)

  const navigate = useNavigate()

  const initializePay = async(order) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Credits Payment',
        description: 'Credits Payment',
        order_id: order.id,
        receipt: order.receipt,
        handler: async (res) => {
            console.log(res)
            try {
              const {data} = await axios.post(backend_Url + '/api/user/verify-pay', 
                {razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature}, 
                {headers: {token}})
                
              if(data.success){
                loadCreditsData()
                navigate('/')
                toast.success('Credits Added,Enjoy Generating!')
              }
              else{
                toast.error(data.message)
              }
            } catch (error) {
              console.log(data.message)
              toast.error(error.message)
            }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#F37254",
        },
      }
      const rzrPay = new window.Razorpay(options)
      rzrPay.open();
  }

  const paymentRazorpay = async (planId) => {
    try {
      if(!user){
        setShowLogin(true)
      }
      const {data} = await axios.post(backend_Url + '/api/user/payment',{userId:user._id,planId},{headers:{token}}) //api call for razor pay payment api endpoint
      
      if(data.success){
        initializePay(data.order)
      }

    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <motion.div
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1 , y: 0 }}
    viewport={{ once: true }}
    className='min-h-[80vh] text-center pt-14 mb-10'>
     <button className=' border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
     <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the Plan</h1>

     <div className='flex flex-wrap justify-center gap-6 text-left'>
      {plans.map((item,index)=>(
        <div className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500' key={index}> 
            <img src={assets.red_logo} alt="" width={40}/>
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'><span className='text-3xl font-medium'>₹{item.price}</span> / {item.credits} credits</p>
            <button onClick={()=>paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>{user ? 'Purchase' : 'Get Started'}</button>
        </div>
      ))}

     </div>
    </motion.div>
  )
}

export default BuyCredit
