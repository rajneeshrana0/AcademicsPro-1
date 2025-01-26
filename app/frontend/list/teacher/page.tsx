
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, teachersData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


type Teacher = {
  id: number,
  teacherId: string,
  name: string,
  email?: string,
  photo: string,
  phone: string,
  address: string,
  subjects: string[],
  classes: string[],
  action?: string
}

const columns = [
  { header: "info", accessor: "info" },
  { header: "Teacher ID", accessor: "teacher_id", className: "hidden md:table-cell" },
  { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
  { header: "classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action", },
]

const TeacherList = () => {

  const renderRow = (item: Teacher) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-rajneeshpurpleLight'>
      <td className='flex items-center gap-4 p-4'>
        <Image src={item.photo} alt={item.name} width={40} height={40} className='rounded-full md:hidden xl:block w-10 h-10' />
        <div className='flex flex-col'>
          <h1 className='font-semibold'>{item.name}</h1>
          <h4 className='text-gray-500 text-xs'> {item?.email}</h4>
        </div>
      </td>
      <td className='hidden md:table-cell'>{item.teacherId}</td>
      <td className='hidden md:table-cell'>{item.subjects.join(",")}</td>
      <td className='hidden md:table-cell'>{item.classes.join(",")}</td>
      <td className='hidden md:table-cell'>{item.phone}</td>
      <td className='hidden md:table-cell'>{item.address}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/teachers/${item.id}`}>

            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-rajneeshsky'>
              <Image src='/view.png' alt='edit' width={20} height={20} />
            </button>
          </Link>
          {role === 'admin' && (
            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-[#CDCFF8]'>
              <Image src='/delete.png' alt='edit' width={20} height={20} />
            </button>
          )}
        </div>
      </td>

    </tr>

  )
  return (
    <div className='bg-white p-4 rounded-md text-black flex-1 m-4 mt-0'>

      {/* top */}
      <div className=' flex items-center justify-between'>
        <h1 className='text-lg font-semibold hidden md:block'>All Teachers</h1>
        <div className='flex flex-col md:flex-row items-center gap-4  w-full md:w-auto '>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-rajneeshYellow'>
              <Image src='/filter.png' alt='' width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-rajneeshYellow'>
              <Image src='/sort.png' alt='' width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-rajneeshYellow'>
              <Image src='/plus.png' alt='' width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* list */}
      <div className=''>
        <Table columns={columns} renderRow={renderRow} data={teachersData} />
      </div>

      {/* Pagination */}
      <Pagination />

    </div>
  )
}

export default TeacherList