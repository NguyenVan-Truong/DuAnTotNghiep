import { Text, Title } from '@mantine/core'
import React from 'react'
import { MdNavigateNext } from 'react-icons/md'

const TitleProducts = () => {
    return (
        <>
            <div className='container mx-auto'>
                <div className=' flex items-center space-x-8 mt-5 border-b border-b-gray-200'>
                    <Title order={3} className='border-b-2 border-b-gray-400' >Toàn Bộ Sản Phẩm</Title>
                    <Text size='md' className='flex items-center space-x-5 hover:text-red-500'>xem tất cả<span><MdNavigateNext className='text-xl' /></span></Text>
                </div>
            </div>
        </>
    )
}

export default TitleProducts