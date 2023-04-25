import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { AES, enc } from 'crypto-js';
import apiData from '/lib/zp_api_listing_data.json'
import { FiChevronLeft } from 'react-icons/fi'
import { FiChevronRight } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { ImCopy } from 'react-icons/im'
import { AiOutlineMail } from 'react-icons/ai'
import { FiMessageSquare } from 'react-icons/fi'
import { MdWhatsapp } from 'react-icons/md'
import { RiMessengerLine } from 'react-icons/ri'
import { SlSocialFacebook } from 'react-icons/sl'
import { TfiTwitter } from 'react-icons/tfi'
import { ImPinterest2 } from 'react-icons/im'
import { ImEmbed2 } from 'react-icons/im'
import { RxCross1 } from 'react-icons/rx'
import Popup from 'reactjs-popup';
import { QRCodeSVG } from 'qrcode.react';
import Card from '@/components/card';

const mainImage = () => {
    const router = useRouter();
    const { id, q } = router.query;
    const [data, setData] = useState(apiData.listing);
    const [isOpen, setIsOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [whatsappClicked, setWhatsappClicked] = useState(false);
    const [messengerClicked, setMessengerClicked] = useState(false);
    const [url, setURL] = useState(`https://localhost:/${router.pathname}`);
    const [copied, setCopied] = useState(false);
    const [facebookClicked, setFacebookClicked] = useState(false);
    const [twitterClicked, setTwitterClicked] = useState(false);
    const [pinterestClicked, setPinterestClicked] = useState(false);
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
    }, [q])

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


    useEffect(() => {
        if (whatsappClicked) {
            window.open(`https://web.whatsapp.com/send?text=${url}`);
            setWhatsappClicked(false);
        }
        if (messengerClicked) {
            window.open(`https://www.facebook.com/dialog/send?link=${url}`, '_blank');
            setMessengerClicked(false);
        }
        if (facebookClicked) {
            window.open(`https://www.facebook.com/sharer.php?u=${url}`, '_blank');
            setFacebookClicked(false);
        }
        if (twitterClicked) {
            window.open(`https://twitter.com/share?url=${url}`, '_blank');
            setTwitterClicked(false);
        }
        if (pinterestClicked) {
            window.open(`https://pinterest.com/pin/create/button/?url=${url}`, '_blank');
            setPinterestClicked(false);
        }
    }, [whatsappClicked, messengerClicked, facebookClicked, twitterClicked, pinterestClicked]);


    function sendEmail() {
        window.location = "mailto: ";
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(!copied);
    }

    const copyHTML = () => {
        setCopied(!copied);
        navigator.clipboard.writeText('<iframe src="https://zimopro.com/embedded/property?id=U2FsdGVkX18as38+YBdqu64b5pDyxZe/UzbTryCgh54=" height="450px" width="450px" style="margin: auto; display: block;" frameborder="0"></iframe>');
    }

    console.log(result);

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
                        <div className='flex items-center cursor-pointer' onClick={() => setIsOpen(true)}>
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
                <div className='z-10 flex justify-between p-6  text-[#AFACAA] cursor-pointer sm:mx-0 mx-14'>
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
            <Popup open={isOpen} onClose={() => setIsOpen(false)} closeOnDocumentClick={false} modal>
                <div className='flex items-center justify-center bg-white/50 rounded-xl backdrop-blur-lg backdrop-filter sm:m-4'>
                {/* <div className='flex items-center justify-center  rounded-xl bg-white sm:m-4'> */}
                    <div className='rounded-2xl backdrop-blur-lg  backdrop-filter '>
                        <div className='flex items-center justify-between p-6'>
                            <RxCross1 className='cursor-pointer' onClick={() => setIsOpen(false)} />
                            <h1 className='uppercase tracking-widest font-light sm:hidden'>SHARE THIS property LISTING</h1>
                            <img className='invert' src="/static/zimologo.svg" alt="" />
                        </div>
                        <hr className='text-[#BE9F56] border-1 border-[#BE9F56]' />
                        <div className='m-3'>
                            <h1 className='text-right uppercase text-xs tracking-widest font-light m-3'>thank you for sharing</h1>
                            <div className='flex items-center justify-between m-3'>
                                <img className='w-[100px] h-[100px] rounded-lg bg-cover bg-center' src={`${imagesArray[0]}`} alt="" />
                                <h1 className='uppercase text-xs tracking-widest font-light'>london anik</h1>
                            </div>
                            <div className='flex flex-wrap items-center justify-between'>
                                <div className='cursor-pointer m-3 sm:m-1  w-[15%] flex flex-col items-center justify-center h-[115px] sm:w-[30%] max-w-[100px]'>
                                    <div className='rounded-xl w-full h-full m-1 border-[1px] border-[#737273] flex items-center justify-center'>
                                        <img className='w-14 h-14' src="/static/copy.png" onClick={copyToClipboard} alt="" />
                                    </div>
                                    <h1 className='text-[10px]'>{copied ? 'COPIED' : 'COPY LINK'}</h1>
                                </div>
                                <div className='cursor-pointer m-3 sm:m-1  w-[15%] flex flex-col items-center justify-center h-[115px] sm:w-[30%] max-w-[100px]'>
                                    <div className='rounded-xl w-full h-full m-1 border-[1px] border-[#737273] flex items-center justify-center'>
                                        <img className='w-14 h-14' src="/static/email.svg" onClick={sendEmail} alt="" />
                                    </div>
                                    <h1 className='text-[10px]'>EMAIL</h1>
                                </div>
                                <div className='cursor-pointer m-3 sm:m-1  w-[15%] flex flex-col items-center justify-center h-[115px] sm:w-[30%] max-w-[100px]'>
                                    <div className='rounded-xl w-full h-full m-1 border-[1px] border-[#737273] flex items-center justify-center '>
                                        <img className='w-14 h-14' src="/static/message.png" alt="" />
                                    </div>
                                    <h1 className='text-[10px]'>MESSAGES</h1>
                                </div>
                                <div className='cursor-pointer m-3 sm:m-1  w-[15%] flex flex-col items-center justify-center h-[115px] sm:w-[30%] max-w-[100px]'>
                                    <div className='rounded-xl w-full h-full m-1 border-[1px] border-[#737273] flex items-center justify-center'>
                                        <img className='w-14 h-14' src="/static/whatsapp.svg" onClick={() => setWhatsappClicked(true)} alt="" />
                                    </div>
                                    <h1 className='text-[10px]'>WHATSAPP</h1>
                                </div>
                                <div className='cursor-pointer m-3 sm:m-1  w-[15%] flex flex-col items-center justify-center h-[115px] sm:w-[30%] max-w-[100px]'>
                                    <div className='rounded-xl w-full h-full m-1 border-[1px] border-[#737273] flex items-center justify-center'>
                                        <img className='w-14 h-14' src="/static/messenger.svg" onClick={() => setMessengerClicked(true)} alt="" />
                                    </div>
                                    <h1 className='text-[10px]'>MESSENGER</h1>
                                </div>
                                <div className='cursor-pointer m-3 sm:m-1  w-[15%] flex flex-col items-center justify-center h-[115px] sm:w-[30%] max-w-[100px]'>
                                    <div className='rounded-xl w-full h-full m-1 border-[1px] border-[#737273] flex items-center justify-center'>
                                        <img className='w-14 h-14' src="/static/facebook.svg" onClick={() => setFacebookClicked(true)} alt="" />
                                    </div>
                                    <h1 className='text-[10px]'>FACEBOOK</h1>
                                </div>
                                <div className='cursor-pointer m-3 sm:m-1  w-[15%] flex flex-col items-center justify-center h-[115px] sm:w-[30%] max-w-[100px]'>
                                    <div className='rounded-xl w-full h-full m-1 border-[1px] border-[#737273] flex items-center justify-center'>
                                        <img className='w-14 h-14' src="/static/twitter.svg" onClick={() => setTwitterClicked(true)} alt="" />
                                    </div>
                                    <h1 className='text-[10px]'>TWITTER</h1>
                                </div>
                                <div className='cursor-pointer m-3 sm:m-1  w-[15%] flex flex-col items-center justify-center h-[115px] sm:w-[30%] max-w-[100px]'>
                                    <div className='rounded-xl w-full h-full m-1 border-[1px] border-[#737273] flex items-center justify-center'>
                                        <img className='w-14 h-14' src="/static/pinterest.svg" onClick={() => setPinterestClicked(true)} alt="" />
                                    </div>
                                    <h1 className='text-[10px]'>PINTERRST</h1>
                                </div>
                                <div className='cursor-pointer m-3 sm:m-1  w-[15%] flex flex-col items-center justify-center h-[115px] sm:w-[30%] max-w-[100px]'>
                                    <div className='rounded-xl w-full h-full m-1 border-[1px] border-[#737273] flex items-center justify-center'>
                                        <img className='w-14 h-14' src="/static/embeded.svg" onClick={() => setPopupOpen(true)} alt="" />
                                    </div>
                                    <h1 className='text-[10px]'>EMBEDED</h1>
                                </div>
                                <div className='cursor-pointer m-3 sm:m-1  w-[15%] flex flex-col items-center justify-center h-[115px] sm:w-[30%] max-w-[100px]'>
                                    <div className='rounded-xl w-fit p-2 h-fit m-1 border-[1px] border-[#737273] flex items-center justify-center'>
                                        {result ?
                                            <QRCodeSVG className='w-16 h-16' value={`${result.price}${result.currency}`} />
                                            :
                                            " "
                                        }
                                    </div>
                                    <h1 className='text-[10px]'>QR CODE</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
            <Popup open={popupOpen} onClose={() => setPopupOpen(false)} closeOnDocumentClick={false} modal>
                <div className='w-[900px] sm:w-fit sm:m-4 bg-white/50 backdrop-blur-lg  backdrop-filter z-40 rounded-2xl  -ml-20'>
                {/* <div className='w-[900px] sm:w-fit sm:m-4 bg-white z-40 rounded-2xl  -ml-20'> */}
                    <div className='flex items-center justify-between p-6'>
                        <RxCross1 className='cursor-pointer' onClick={() => setPopupOpen(false)} />
                        <h1 className='tracking-widest font-light sm:hidden'>EMBEDED THIS PROPERTY LISTING</h1>
                        <img className='invert' src="/static/zimologo.svg" alt="" />
                    </div>
                    <hr className='text-[#BE9F56] border-1 border-[#BE9F56]' />
                    <div className='p-6 flex justify-between'>
                        <div className='w-1/2 sm:w-full md:w-full -sm:mr-4 mr-4'>
                            <h1 className='mb-10 text-lg tracking-widest font-light'>PREVIEW</h1>
                            <h1 className='mb-2 text-lg tracking-widest font-light'>COPY AND PASTE THE FOLLOWING HTML INTO YOUR WEBSITE CODE:</h1>
                            <div className='p-4 rounded-2xl border-[1px] border-[#737273] flex flex-wrap text-xs mb-9 w-full font-light'>
                                &lt;iframe src="https://zimopro.com/embedded/property?id=U2FsdGVkX18as38+YBdqu64b5pDyxZe/UzbTryCgh54=" height="450px" width="450px" style="margin: auto; display: block;" frameborder="0"&gt;
                                &lt;/iframe&gt;
                            </div>
                            <div className='flex items-end justify-between'>
                                <button className='p-10 text-white bg-black rounded-xl mb-3' onClick={copyHTML}>
                                    {copied ?
                                        <h1 className='font-light'>COPIED</h1> :
                                        <>
                                            <h1 className='font-light'>COPY</h1>
                                            <h1 className='font-light'>HTML</h1>
                                        </>
                                    }
                                </button>
                                <div className='flex flex-col  items-center'>
                                    <div className='rounded-xl w-fit p-2 h-fit m-1 border-[1px] border-[#B8B7B9] flex items-center justify-center'>
                                        {result ?
                                            <QRCodeSVG className='w-16 h-16' value={`${result.price}${result.currency}`} />
                                            :
                                            " "
                                        }
                                    </div>
                                    <h1 className='text-[10px]'>QR CODE</h1>
                                </div>
                            </div>
                            <div className='flex items-center font-light tracking-widest cursor-pointer' onClick={() => setPopupOpen(false)}>
                                <FiChevronLeft />
                                BACK
                            </div>
                        </div>
                        <div className='w-1/2 sm:hidden md:hidden'>
                            <Card Info={result} />
                            <div className='flex justify-between mt-10'>
                                <h1 className='font-light tracking-widest'>VIEW PROPERTY LISTING</h1>
                                <img className='invert' src="/static/zimologo.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}

export default mainImage;