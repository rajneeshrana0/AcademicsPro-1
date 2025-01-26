'use client'

import Image from 'next/image';
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events =[

    {
        id:1,
        title:'Event 1',
        time:'10:00 AM',
        discription:'This is event 1',
    },
    {
        id:2,
        title:'Event 2',
        time:'11:00 AM',
        discription:'This is event 2',
    },
    {
        id:3,
        title:'Event 3',
        time:'12:00 PM',
        discription:'This is event 3',
    },
   
]

const EventCalender = () => {
    const [value, onChange] = useState<Value>(new Date());
  return (
    <div className='bg-background p-4 rounded-lg shadow-sm text-foreground/35  shadow-red-100'>

<Calendar onChange={onChange} value={value} />

<div className=" flex items-center justify-between text-white">
    <h1 className='text-xl font-semibold my-4'>Events</h1>
    <Image src='/moreDark.png' alt='' width={20} height={20}/>
</div>

<div className='flex flex-col gap-4'>
    {
        events.map((event)=>{
            return(
                <div className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-rajneeshsky even:border-t-rajneeshpurple' key={event.id} >
                   <div className='flex items-center justify-between'>
                          <h1 className='font-semibold text-white'>{event.title}</h1>
                          <span className='text-gray-300 text-xs'>{event.time}</span>
                   </div>
                     <p className='mt-2 text-gray-400 text-sm'>{event.discription}</p>
                </div>
            )
        })
    }
</div>
    </div>
  )
}

export default EventCalender