import { useRouter } from 'next/router';
import { AES, enc } from 'crypto-js';
import apiData from '/lib/zp_api_listing_data.json'
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs'

const DetailsPage = () => {
  const [data, setData] = useState(apiData.listing);
  const router = useRouter();
  const { id } = router.query;
  const decryptedId = AES.decrypt(decodeURIComponent(id), '12345').toString(enc.Utf8);
  const result = data.find(item => item.id == decryptedId);
  let imagesArray = [];
  if (result) {
    imagesArray = result.details.images.split(',');
  }
  const handleBack = () => {
    router.push('/home');
  }

  const handleOnClick = (index,id) => {
    router.push(`/mainImage/?q=${index}&id=${encodeURIComponent(id)}`)
  }

  return (
    <>
      <div className='flex items-center m-8 w-20 justify-between cursor-pointer' onClick={() => handleBack()}>
        <BsArrowLeft />
        <h1 className='text-lg'>BACK</h1>
      </div>
      <div className="max-w-screen-lg m-12">
        <div className="grid grid-cols-6 sm:grid-cols-1 md:grid-cols-1 gap-2">
          {imagesArray.map((item, index) => {
            if (index % 8 === 0 || index % 8 === 1) {
              return (
                <>
                  <div className="h-96 bg-cover bg-center col-span-3 cursor-pointer" style={{ backgroundImage: `url(${item})` }} onClick={() => handleOnClick(index,id)} />
                </>
              );
            } else if (index % 8 === 2 || index % 8 === 3 || index % 8 === 4) {
              return (
                <div className="h-96 bg-cover bg-center col-span-2 cursor-pointer" style={{ backgroundImage: `url(${item})` }} onClick={() => handleOnClick(index,id)} />
              );
            } else if (index % 8 === 5 || index % 8 === 6) {
              return (
                <div className="h-96 bg-cover bg-center col-span-3 cursor-pointer" style={{ backgroundImage: `url(${item})` }} onClick={() => handleOnClick(index,id)} />
              );
            } else {
              return (
                <div key={index} className="w-full my-2 col-span-full cursor-pointer">
                  <div className="h-96 bg-cover bg-center" style={{ backgroundImage: `url(${item})` }} onClick={() => handleOnClick(index,id)} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
