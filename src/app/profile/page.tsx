"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import AddTodo from '../components/add-todo'
import Todos from '../components/todos'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetails = async () => {
try {
      const res = await axios.get('/api/users/me')
      console.log(res.data.data._id);
      setData(res.data.data._id)
} catch (error) {
  console.log("error", error);
}
  }

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success("Logout successful")
      router.push('/login')
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <section className='flex flex-col justify-center items-center h-200' >
      <h1 className="font-bold text-7xl mt-20 mb-10 text-[#493D9E]" >To-Do App</h1>
      <AddTodo />
      <Todos />

        <p className='mt-5' >{data === "nothing"? "No data" : <Link href={`/profile/${data}`} className='mt-5 underline text-blue-800' >Click here</Link> }</p>
        <button className='bg-red-700 text-white h-10 w-20 rounded-md my-5' onClick={logout} >Logout</button>
        <button className='bg-green-800 text-white h-10 w-30 rounded-md' onClick={getUserDetails} >Get User ID</button>

    </section>
  )
}
