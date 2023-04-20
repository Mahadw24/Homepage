import React, { useRef, useState } from 'react'
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useTimer } from "reactjs-countdown-hook";
import { AiFillCaretLeft } from 'react-icons/ai'
import { AiFillCaretRight } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { useRouter } from 'next/router';
import { AES } from 'crypto-js';

const Card = ({ Info, isDragging }) => {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const images = Info.details.images;
    const imagesArray = images.split(',');

    function handleHeartClick() {
        setIsHeartFilled(!isHeartFilled);
    }
    const slideRight = () => {
        if (currentIndex !== imagesArray.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setActiveIndex((prev) => prev + 1);
        }
        else if (currentIndex === imagesArray.length - 1) {
            setCurrentIndex(0);
            setActiveIndex(0);
        }
    }
    const slideLeft = () => {
        if (currentIndex === 0) {
            setCurrentIndex(imagesArray.length - 1);
            setActiveIndex(imagesArray.length - 1);
        }
        else {
            setCurrentIndex(currentIndex - 1);
            setActiveIndex((prev) => prev - 1);
        }
    }
    const targetDate = new Date(Info.expiry);
    function calculateSecondsToDate(targetDate) {
        const now = new Date();
        const targetTime = targetDate.getTime();
        const currentTime = now.getTime();
        const secondsDifference = (targetTime - currentTime) / 1000;
        return secondsDifference;
    }
    const time = calculateSecondsToDate(targetDate);
    const {
        seconds,
        minutes,
        hours,
        days,
    } = useTimer(time);
    const second = Math.floor(seconds);
    const Indicator = ({ indexValue, bgValue }) => {
        const indicatorStyle = {
            width: '40px',
            height: '2.75px',
            borderRadius: '20%',
            backgroundColor: `${bgValue}`,
            cursor: 'pointer',
            margin: '0 4px',
        };
        return <div style={indicatorStyle} />;
    };

    const handleCardOnClick = (id) => {
        const encryptedId = AES.encrypt(id.toString(), '12345').toString();
        router.push(`/details?id=${encodeURIComponent(encryptedId)}`);
    };

    return (
        <>
            <div className='flex flex-col items-center rounded-t-3xl m-1 sm:m-4 sm:justify-center'>
                <div className='z-1 sm:min-w-[344px] card h-[340px] rounded-t-3xl w-full max-w-[900px] p-4 mb-1 flex flex-col' style={{ backgroundImage: `url(${imagesArray[currentIndex]})` }}>
                    <div className='text-white flex justify-around items-center mb-4'>
                        <div className='z-10 flex flex-col items-center'>
                            <p className='text-[43px] tracking-widest font-light'>{days}</p>
                            <p className='text-[10px] text-white tracking-wider'>DAYS</p>
                        </div>
                        <div className='z-10 flex flex-col items-center'>
                            <p className='text-[43px] tracking-widest  font-light'>{hours}</p>
                            <p className='text-[10px] text-white tracking-wider'>HOURS</p>
                        </div>
                        <div className='z-10 flex flex-col items-center'>
                            <p className='text-[43px] tracking-widest font-light'>{minutes}</p>
                            <p className='text-[10px] text-white tracking-wider'>MINUTES</p>
                        </div>
                        <div className='z-10 flex flex-col items-center'>
                            <p className='text-[43px] tracking-widest font-light'>{second}</p>
                            <p className='text-[10px] text-white tracking-wider'>SECONDS</p>
                        </div>
                    </div>
                    <div className='flex justify-end -mt-2'>
                        <div className='z-10 flex w-20 justify-between'>
                            <AiOutlineShareAlt className='text-3xl text-white' />
                            {isHeartFilled ?
                                <AiFillHeart onClick={handleHeartClick} className='cursor-pointer text-red-600 text-3xl h-fit' />
                                :
                                <AiOutlineHeart onClick={handleHeartClick} className='cursor-pointer text-white text-3xl h-fit' />
                            }
                        </div>
                    </div>
                    <div className='z-10 text-white flex items-center justify-between my-[10px]  cursor-pointer'>
                        <div>
                            <AiFillCaretLeft className='z-10 cursor-pointer' onClick={slideLeft} />
                        </div>
                        <div className='w-full h-[80px]' onClick={() => handleCardOnClick(Info.id)}>

                        </div>
                        <div>
                            <AiFillCaretRight className='z-10 cursor-pointer' onClick={slideRight} />
                        </div>
                    </div>
                    <div className='z-10 text-white flex text-sm flex-col items-center justify-between '>
                        <div className='flex w-full justify-between mb-1'>
                            <p className='z-10 tracking-wider font-bold text-[12px]'>SHELTON STREET</p>
                            <p className='z-10 tracking-wider font-bold text-[11px]'>COVENT GARDEN</p>
                            <p className='z-10 tracking-wider font-bold text-[11px]'>LONDON</p>
                            <p className='z-10 tracking-wider font-bold text-[11px]'>WC2H</p>
                        </div>
                        <div className='z-10'>
                            <p className='z-10 mb-1 tracking-wider font-bold text-[11px]'>UNITED KINGDOM</p>
                        </div>
                    </div>
                    <div className='z-10 text-white flex items-center justify-between'>
                        <img className='z-10' src="/static/zimologo.svg" alt="" />
                        <div className='z-10 flex flex-col items-center'>
                            <div className='flex flex-col items-center'>
                                <p className='-mb-[2px] tracking-wider font-bold text-[13px]'>£5,000,000 GBP</p>
                                <p className='font-normal tracking-wider text-[10px]'>#ZM786123456</p>
                            </div>
                            <svg width='0' height='0'>
                                <defs>
                                    <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                                        <stop offset='0%' stopColor='#242917' />
                                        <stop offset={`${Info.completion_percentage}%`} stopColor='#3D4227' />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <CircularProgressbar
                                className='z-10 h-8 w-8 flex items-center justify-center text-white absolute bottom-[50px] left-[80px]'
                                styles={{
                                    text: {
                                        fontSize: '35px',
                                        fill: 'white',
                                    },
                                    path: {
                                        stroke: 'url(#gradient)',
                                    },
                                    trail: { stroke: 'black' }
                                }}
                                text={`${Info.completion_percentage}%`}
                                percentage={Info.completion_percentage}
                            />
                        </div>
                        <img className='z-10' src="/static/bottomlogo.svg" alt="" />
                    </div>
                    <div className='z-10 flex items-center justify-center mt-2'>
                        <div className='flex items-center w-72 justify-center'>
                            {
                                imagesArray.map((item, index) => {
                                    return (
                                        <>
                                            <Indicator key={index} indexValue={activeIndex} bgValue={index === activeIndex ? 'white' : 'gray'} />
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='sm:min-w-[344px] w-full bg-black text-white p-3 rounded-b-2xl flex justify-between item-center px-6 cursor-pointer'>
                    <p className='font-bold text-[14px] tracking-wider'>£ 5,000,000 GBP</p>
                    <div className='flex flex-col items-end'>
                        <p className='tracking-widest font-bold text-[13px]'>BUY ENTRY NOW</p>
                        <p className='text-[11px]'>#ZM786123456</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;
