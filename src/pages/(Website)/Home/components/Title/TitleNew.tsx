import { Text, Title } from '@mantine/core'
import React from 'react'
import { MdNavigateNext } from "react-icons/md";
const TitleNew = () => {
    return (
        <>
            <div className='container mx-auto'>
                <div className=' flex items-center space-x-8 border-b border-b-gray-200'>
                    <Title order={3} className='border-b-2 border-b-gray-400' >Sản Phẩm Mới</Title>
                    <Text size='md' className='flex items-center space-x-5 hover:text-red-500'>xem tất cả<span><MdNavigateNext className='text-xl' /></span></Text>
                </div>
            </div>
        </>
    )
}

export default TitleNew