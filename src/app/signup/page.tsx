"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {

  const router = useRouter()
  
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })
  
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log("response", response.data);
      router.push('/login')
      alert("Signup successful, please login")
    } catch (error) {
        console.log("signup failed");
        alert("Signup failed, please try again")
        if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("An unknown error occurred")
      }
    }
  }

  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length >= 8 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  
  return (
    <div className='flex items-center flex-col' >
      <section className='bg-[#EFEEEA] h-100 w-100 flex flex-col justify-center items-center mt-50 rounded-lg drop-shadow-sm'>
        <h1 className='font-bold text-4xl'>{ loading? "processing" : "SIGN UP"}</h1>
        <div className='flex flex-col'>
        <label className='mt-5' htmlFor="username">Username</label>
        <input required id='username' placeholder='your username' value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} className='bg-white h-8 p-2 rounded-md' type="text" />
        <label className='mt-5' htmlFor="email">Email</label>
        <input required id='email' placeholder='your email' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className='bg-white h-8 p-2 rounded-md' type="email" />
        <label className='mt-5' htmlFor="username">Password</label>
        <input required id='password' placeholder='your password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} className='bg-white h-8 p-2 rounded-md' type="password" />
        </div>
        <button
  onClick={onSignup}
  className='mt-5 rounded-md h-10 w-40 bg-[#FFB22C] cursor-pointer'
  disabled={buttonDisabled || loading} // disable if form incomplete or loading
>
  {buttonDisabled || loading ? "No Sign Up" : "Sign Up"}
</button>
      </section>
      <Link href="/login" className='mt-5 underline text-blue-800 font-bold' >Login Page</Link>
    </div>
  )
}

