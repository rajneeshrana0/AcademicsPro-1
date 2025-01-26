import Announcment from '@/components/Announcment'
import BigCalender from '@/components/BigCalender'
// import EventCalender from '@/components/EventCalender'
import React from 'react'

const Teacher = () => {
  return (
    <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row ' >

      {/* left  */}
      <div className='w-full xl:w-2/3'>
      
      <div className="h-full bg-white text-black rounded-md p-4"> 
      <h1 className='text-2xl font-semibold'>Schedule  </h1>
      <BigCalender />
      </div>
      </div>
      
      {/* right */}
    
      <div className="w-full xl:w-1/3 flex flex-col gap-8 ">
            {/* <EventCalender /> */}
            <Announcment />
            
            
            </div>
    </div>
  )
}

export default Teacher