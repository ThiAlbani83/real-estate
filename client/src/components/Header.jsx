import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const { currentUser } = useSelector(state => state.user)
    
    return (
        <header className='bg-slate-200 shadow-md px-4'>
            <div className='flex items-center justify-between max-w-6xl mx-auto p-3'>
                <Link to={'/'}>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Albani</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-2 rounded-lg flex items-center justify-between'>
                    <input type="text" placeholder='Search...' className='bg-transparent outline-none w-24 sm:w-64' />
                    <FaSearch className='text-slate-600' />
                </form>
                <ul className='flex gap-4'>
                    <Link to={'/'}>
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer text-sm sm:text-base'>
                            Home
                        </li>
                    </Link>
                    <Link to={'/about'}>
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer text-sm sm:text-base'>
                            About
                        </li>
                    </Link>
                    <Link to={'/profile'}>
                        {currentUser ? (
                            <img src={currentUser.avatar} alt="profile" className='rounded-full w-7 h-7 object-cover' />
                        ) : <li className='text-slate-700 hover:underline cursor-pointer text-sm sm:text-base'>
                            Sign In
                        </li>}
                    </Link>

                </ul>
            </div>
        </header >
    )
}