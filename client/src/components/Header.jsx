import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const { currentUser } = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);

    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search])

    return (
        <header className='bg-slate-200 shadow-md px-4'>
            <div className='flex items-center justify-between max-w-[1440px] mx-auto p-3'>
                <Link to={'/'}>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>RealEstate</span>
                        <span className='text-slate-700'>Hub</span>
                    </h1>
                </Link>
                <form
                    onSubmit={handleSubmit}
                    className='bg-slate-100 p-2 rounded-lg flex items-center justify-between'>
                    <input
                        value={searchTerm}
                        type="text" placeholder='Procurar...'
                        className='bg-transparent outline-none w-24 sm:w-64'
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <button type='submit'>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>
                <ul className='flex gap-4 items-center'>
                    <Link to={'/'}>
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer text-sm sm:text-base'>
                            Home
                        </li>
                    </Link>
                    <Link to={'/about'}>
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer text-sm sm:text-base'>
                            Sobre
                        </li>
                    </Link>
                    <Link to={'/profile'}>
                        {currentUser ? (
                            <img src={currentUser.avatar} alt="profile" className='rounded-full w-7 h-7 object-cover' />
                        ) : <li className='text-white px-3 py-1 rounded-lg bg-slate-700 hover:underline cursor-pointer text-sm sm:text-base'>
                            Entrar
                        </li>}
                    </Link>
                </ul>
            </div>
        </header >
    )
}