import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const Navbar = ({ onSearch, searchValue }) => {
    const nav = useNavigate();
    return (
        <>
            <div className='w-full flex justify-between items-center font-semibold'>
                <div className='flex items-center gap-2'>
                    <img onClick={() => nav(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
                    <img onClick={() => nav(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
                </div>
                <div className='flex items-center gap-4'>
                    <input
                        type="text"
                        placeholder="Search songs or albums..."
                        value={searchValue}
                        onChange={onSearch}
                        className="px-3 py-1 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-black text-[15px] w-40 md:w-64"
                        style={{ background: 'white' }}
                    />
                    <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>Explore Premium</p>
                    <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Install App</p>
                    <p className='bg-orange-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer'>V</p>
                </div>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
                <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
                <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>
            </div>
        </>
    );
}

export default Navbar