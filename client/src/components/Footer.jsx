import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className='bg-slate-200 shadow-md px-4'>
            <div className='flex  max-w-[1440px] mx-auto p-3 gap-10'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>RealEstate</span>
                    <span className='text-slate-700'>Hub</span>
                </h1>
                {/* <div className='flex flex-col gap-2 '>
                    <Link to={'/search?type=rent'} className='text-slate-700 hover:underline'>
                        For rent
                    </Link>
                    <Link to={'/search?type=sale'} className='text-slate-700 hover:underline'>
                        For sale
                    </Link>
                    <Link to={'/search?type=rent'} className='text-slate-700 hover:underline'>
                        Offers
                    </Link>
                </div> */}
            </div>
        </footer>
    )
}
