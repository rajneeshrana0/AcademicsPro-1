"use client"
import Image from 'next/image';
import React from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Total',
        count: 165,

        fill: 'black',
    },
    {
        name: 'Girls',
        count: 65,

        fill: '#FAE27C',
    },
    {
        name: 'Boys',
        count: 75,

        fill: '#C3EBFA',
    },
];

const CountChart = () => {
    return (
        <div className='rounded-xl bg-background p-4 text-white w-full h-full shadow-sm shadow-red-100 '>
            {/* Title  */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Students</h1>
                <Image src='/moreDark.png' alt='' width={20} height={20} />
            </div>
            {/* Chart  */}
            <div className='w-full h-[75%] relative' >
                <ResponsiveContainer >
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                        <RadialBar

                            label={{ position: 'insideStart', fill: '#fff' }}
                            background

                            dataKey="count"
                        />
                        {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle"  /> */}
                    </RadialBarChart>
                </ResponsiveContainer>
                <Image src='/maleFemale.png' alt='' height={50} width={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
            </div>
            {/* Bottom  */}
            <div className=' flex justify-center gap-16'>
                <div className='flex flex-col gap-1 '>
                    <div className='w-5 h-5 bg-rajneeshsky rounded-full' />
                    <h1 className='font-bold '>125</h1>
                    <h2 className='text-xs text-gray-300'>Boys (55%)</h2>
                </div>
                <div className='flex flex-col gap-1 '>
                    <div className='w-5 h-5 bg-rajneeshYellow rounded-full' />
                    <h1 className='font-bold '>125</h1>
                    <h2 className='text-xs text-gray-300'>Girl (65%)</h2>
                </div>
            </div>
        </div>

    )
}

export default CountChart