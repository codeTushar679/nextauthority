import React from 'react'

interface PageProps {
  params: {id: string; };
}

function ProfilePage({ params }: PageProps) {
  return (
    <div className='flex flex-col justify-center items-center h-200' >
      <h1 className='font-bold text-4xl'>Profile Page</h1>
      <p>User ID: {params.id}</p>
    </div>
  )
}

export default ProfilePage