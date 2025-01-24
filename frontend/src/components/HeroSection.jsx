import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className="text-gradient">Dream Jobs</span></h1>
                <p>Find Your Web3 Career with THRM Digital Marketing Agency</p> 
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-[black]'>
  <input
    type="text"
    placeholder='Find your dream jobs'
    onChange={(e) => setQuery(e.target.value)}
    className='outline-none border-none w-full  placeholder:text-white bg-[black]'
  />
  <Button onClick={searchJobHandler} className="rounded-r-full bg-[black]">
    <Search className='h-5 w-5' />
  </Button>
</div>

            </div>
            <style jsx>{`
                .text-gradient {
                    background: linear-gradient(90deg, #81c315 0, #ffd300);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }
            `}</style>
        </div>

        
    )
}




export default HeroSection