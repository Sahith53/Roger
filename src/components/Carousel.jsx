import React from 'react';
import { FaPlay } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Carousel = () => {
    return (
        <>
            <div className="w-full xl:w-9/12 flex items-center justify-center">
                <div className="flex w-full items-center rounded-[30px] relative h-[30rem] md:h-[25rem] lg:h-[30rem] shadow-lg">
                    <img src="https://4kwallpapers.com/images/walls/thumbs_3t/17464.jpg" alt="spiderman" className="h-full rounded-3xl w-full object-cover" />
                    <div className="absolute w-full h-full bg-gradient-to-tr p-5 md:p-10 justify-between flex px-5 md:px-12 flex-col items-start from-black to-gray-900/10 rounded-3xl">
                        <span className='bg-gray-600/10 border border-gray-500 text-white py-1 rounded-full backdrop-blur-lg px-3 text-xs md:text-sm'>🔥 Now Trending</span>
                        <div className="w-full flex flex-col md:flex-row items-end justify-between">
                            <div className="flex items-start flex-col w-full md:w-1/2 gap-2">
                                <div className="flex text-xs md:text-sm items-center gap-3">
                                    <span className='bg-gray-800/50 border border-gray-700 text-white py-1 rounded-full backdrop-blur-lg px-3 md:px-5'>Action</span>
                                    <span className='bg-gray-800/50 text-white py-1 border border-gray-700 rounded-full backdrop-blur-lg px-3 md:px-5'>Adventure</span>
                                </div>
                                <h1 className='text-xl md:text-2xl lg:text-4xl py-2 font-semibold w-full text-white'>House of Dragon</h1>
                                <p className='text-xs md:text-sm text-zinc-200'>Miles Morales captures across the Multiverse, where he encounters a team of spidermen charged with protecting its very existence.</p>
                                <div className="flex items-center gap-3 pt-3">
                                    <button className='bg-white flex items-center gap-2 text-black py-2 px-4 md:py-4 md:px-7 border text-xs md:text-sm font-semibold rounded-full'>
                                        <FaPlay className='text-xs md:text-sm' />
                                        Watch Now
                                    </button>
                                    <button className='bg-black/10 backdrop-blur-sm text-white border border-white py-2 px-4 md:py-4 md:px-7 text-xs md:text-sm rounded-full flex gap-2 items-center'>
                                        <IoAddOutline className='text-lg md:text-xl' />
                                        Add to Watchlist
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 flex items-end gap-2 justify-end">
                                <button className='bg-black/20 backdrop-blur-2xl text-zinc-200 p-2 md:p-3 text-lg md:text-xl rounded-full'>
                                    <FaAngleLeft />
                                </button>
                                <button className='bg-black/20 backdrop-blur-2xl text-zinc-200 p-2 md:p-3 text-lg md:text-xl rounded-full'>
                                    <FaAngleRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carousel;
