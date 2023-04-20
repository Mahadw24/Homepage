import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { AES, enc } from 'crypto-js';
import apiData from '/lib/zp_api_listing_data.json'
import { FiChevronLeft } from 'react-icons/fi'
import { FiChevronRight } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'

const mainImage = () => {
    const router = useRouter();
    const { id,q } = router.query;
    const [data, setData] = useState(apiData.listing);
    const [index, setIndex] = useState(parseInt(q));
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const decryptedId = AES.decrypt(decodeURIComponent(id), '12345').toString(enc.Utf8);
    const result = data.find(item => item.id == decryptedId);
    let imagesArray = [];
    if (result) {
        imagesArray = result.details.images.split(',');
    }
    
    useEffect(() => {
        setIndex(parseInt(q));
    },[q])

    function handleHeartClick() {
        setIsHeartFilled(!isHeartFilled);
    }

    const prevImage = () => {
        if (index === 0) {
            setIndex(imagesArray.length - 1);
        }
        else {
            setIndex(index - 1);
        }
    }

    const nextImage = () => {
        if (index !== imagesArray.length - 1) {
            setIndex(index + 1);
        }
        else if (index === imagesArray.length - 1) {
            setIndex(0);
        }
    }

    const handleBack = () => {
        router.push(`/details?id=${encodeURIComponent(id)}`)
    }

    console.log(q);

    return (
        <>
            <div className='w-screen photoview h-screen bg-center bg-cover flex flex-col justify-between' style={{ backgroundImage: `url(${imagesArray[index]})` }}>
                <div className='flex items-start justify-between p-6'>
                    <div className='z-10 flex flex-col h-20 justify-between'>
                        <img className='w-36' src="/static/zimologo.svg" alt="" />
                        <div className='flex items-center text-[#AFACAA] text-xl cursor-pointer' onClick={() => handleBack(id)}>
                            <RxCross1 />
                            <h1 className='ml-3'>CLOSE</h1>
                        </div>
                    </div>
                    <div className='z-10 text-white text-lg flex flex-col items-center justify-between h-20'>
                        <h1 className='md:invisible'>PHOTOGRAPHY</h1>
                        <h1 className='text-2xl text-[#AFACAA]'>{index + 1} of {imagesArray.length}</h1>
                    </div>
                    <div className='flex z-10'>
                        <div className='flex items-center cursor-pointer'>
                            <AiOutlineShareAlt className='text-3xl text-white mr-4' />
                            <h1 className='tracking-widest text-white text-xl ml-2 mr-2 md:hidden'>SHARE</h1>
                        </div>
                        <div className='flex items-center cursor-pointer' onClick={handleHeartClick}>
                            {isHeartFilled ?
                                <AiFillHeart className='text-red-600 text-3xl h-fit' />
                                :
                                <AiOutlineHeart className='text-white text-3xl h-fit' />
                            }
                            <h1 className='tracking-widest text-white text-xl ml-4 md:hidden'>SAVE</h1>
                        </div>
                    </div>
                </div>
                <div className='z-10 flex justify-between p-6 text-[#AFACAA] cursor-pointer mx-14'>
                    <FiChevronLeft className=' w-14 h-14' onClick={() => prevImage()} />
                    <FiChevronRight className='h-14 w-14' onClick={() => nextImage()} />
                </div>
                <div className='z-10 text-[#AFACAA] text-xl m-4'>
                    <div className='text-center tracking-widest'>
                        {result ?
                            <div className='absolute md:text-sm'>
                                {`#ZM${result.uploaded_by.zipcode}`}
                            </div>
                            :
                            <div>

                            </div>
                        }
                        {result ?
                            <>
                                <div className='flex justify-center'>

                                    <h1 className='md:text-sm uppercase'>{`${result.details.address}`}</h1>
                                    <h1 className='ml-3 md:text-sm uppercase'>{`${result.details.city}`}</h1>
                                </div>
                                <h1 className='md:text-sm uppercase'>{`${result.details.state}`}</h1>
                            </>
                            :
                            <div></div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default mainImage;