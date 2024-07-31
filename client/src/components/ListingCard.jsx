import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { FaBed, FaBath } from 'react-icons/fa'

export default function ListingCard({ listing }) {
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRoQkHdI9J4LAMen5pW7GeHLsk-LNmg4PkDw&s"}
                    alt="listingCover" className='h-[320px] sm:h-[220px] object-cover hover:scale-105 transition-scale duration-300' />
                <div className='p-3 flex flex-col gap-2 w-full'>
                    <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
                    <div className='flex items-center gap-2'>
                        <MdLocationOn className='h-4 w-4 text-green-700' />
                        <p className='text-sm text-gray-600 truncate'>{listing.address}</p>
                    </div>
                    <div>
                        <p className='line-clamp-2 text-sm text-gray-600'>
                            {listing.description}
                        </p>
                        <p className='text-slate-500 font-semibold mt-2'>
                            $
                            {listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                            {listing.type === 'rent' && ' / month'}
                        </p>
                        <div className='mt-2 flex items-center gap-4 text-slate-700'>
                            <div className='flex items-center gap-2 font-bold text-sm'>
                                <FaBed className='text-lg' /> {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms` : `${listing.bedrooms} bedroom`}
                            </div>
                            <div className='flex items-center gap-2 font-bold text-sm'>
                                <FaBath className='text-lg' /> {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : `${listing.bedrooms} bathroom`}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
