import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import ListingCard from '../components/ListingCard';

export default function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings();
  }, [])

  return (
    <div>
      {/*Top*/}
      <div className='flex flex-col gap-6 py-28 px-3 max-w-[1440px] mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect</span>
          <br />place with ease</h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          <p>
            Albani Estate is the best place to find your next perfect place to live.
            <br />
            We have a wide range of properties for you to choose from.
          </p>
        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's get started...
        </Link>
      </div>

      {/*Swiper*/}
      <Swiper navigation>


        {offerListings && offerListings.length > 0 && offerListings.map((listings, index) => (
          <SwiperSlide key={index}>
            <div style={{ background: `url(${listings.imageUrls[0]}) center no-repeat`, backgroundSize: "cover" }} className='h-[500px]' >
            </div>
          </SwiperSlide>
        ))
        }
      </Swiper>


      {/*listing results*/}
      <div className='max-w-[1440px] mx-auto p-3 flex flex-col gap-8 my-10'>

        {offerListings && offerListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link to={"/search?offer=true"} className='text-sm text-blue-800 hover:underline'>
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing, index) => (
                <ListingCard key={index} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link to={"/search?type=rent"} className='text-sm text-blue-800 hover:underline'>
                Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing, index) => (
                <ListingCard key={index} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link to={"/search?type=sale"} className='text-sm text-blue-800 hover:underline'>
                Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing, index) => (
                <ListingCard key={index} listing={listing} />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  )
}
