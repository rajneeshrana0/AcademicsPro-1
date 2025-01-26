
import React from 'react'

const Announcment = () => {
    return (
        <div className='bg-background p-4 rounded-lg  text-white shadow-sm shadow-red-100'>

            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-semibold'>Announcment</h1>
                <span className='text-xs text-gray-400'>View All</span>
            </div>

            <div className='flex flex-col gap-4 mt-4'>

                <div className='bg-rajneeshsky rounded-md p-4'>

                    <div className='flex justify-between items-center '>
                        <h2 className='font-medium'> Lorem ipsum dolor sit .</h2>
                        <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1 '>2025-26-01</span>
                    </div>
                    <p className='text-sm text-gray-400 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                </div>

                <div className='bg-rajneeshpurpleLight rounded-md p-4'>

                    <div className='flex justify-between items-center'>
                        <h2 className='font-medium'> Lorem ipsum dolor sit .</h2>
                        <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1 '>2025-26-01</span>
                    </div>
                    <p className='text-sm text-gray-400 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                </div>
                <div className='bg-rajneeshYellowLight rounded-md p-4'>

                    <div className='flex justify-between items-center'>
                        <h2 className='font-medium'> Lorem ipsum dolor sit .</h2>
                        <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1 '>2025-26-01</span>
                    </div>
                    <p className='text-sm text-gray-400 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                </div>


            </div>


        </div>
    )
}

export default Announcment