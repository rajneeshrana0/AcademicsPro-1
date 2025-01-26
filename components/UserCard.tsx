import Image from 'next/image'
import React from 'react'

const UserCard = ({type} : {type:string}) => {
  return (
    <div className='rounded-2xl bg-background/65 p-4 text-foreground flex-1 min-w-[130px] shadow-sm shadow-white'>
        <div className='flex justify-between items-center'>
            <span className='text-[10px] bg-white rounded-full text-green-600 px-2 py-1'>24/2025</span>
            <Image src='/more.png' alt='' width={20} height={20} />

        </div>
        <h1 className='text-2xl font-semibold my-4'>156</h1>
        <h2 className='capitalize text-sm  font-medium text-gray-500'>{type}</h2>

    </div>
  )
}

export default UserCard