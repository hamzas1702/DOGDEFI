import React from 'react';
import {FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import ActivityNotification from './ActivityNotification';

import logo from "../assets/logo.svg";

const Navabr: React.FC = () => {

    let location = useLocation();
    console.log(location.pathname);

    // Function to apply active class if the route matches
    const getLinkClass = (path: string) => {
        return location.pathname === path
        ? 'bg-white w-full px-4 py-2 rounded-3xl text-black font-semibold border-4 border-[#49e9dd]': 'text-white px-4'
    }


  return (
    <div className='flex flex-col gap-2 divide-y-2 divide-gray-600 bg-[#132d46]'>
        <div className='w-full flex flex-col gap-4'>
            <ActivityNotification notification="4dR2Q sold 1.345 SOL of CHLOE" />
        </div>
        <div className=" bg-[#132d46] text-white w-full md:min-h-32 flex justify-between items-center px-4 py-8 shadow-3xl shadow-[#49e9dd] border-r-2 border-[#1b5a71] font-Montserrat">
            {/* Top section - Logo and company name */}

            <div className='flex gap-1 items-center'>
                <img src={logo} alt='' className='w-8 h-8'/>
                <p className='text-[25px] font-Anton tracking-wider'>Dogdefi</p>
            </div>
            <div className='font-Montserrat text-[14px]'>
                <ul className="hidden md:flex gap-1">
                <li><Link to="/dashboard" className={getLinkClass('/dashboard')}>Home</Link></li>
                <li><Link to="/new-coin" className={getLinkClass('/new-coin')}>Start a New Coin</Link></li>
                <li><Link to="/portfolio" className={getLinkClass('/portfolio')}>Twitter</Link></li>
                <li><Link to="/trading" className={getLinkClass('/trading')}>Support</Link></li>
                <li><Link to="/watchlist" className={getLinkClass('/watchlist')}>Telegram</Link></li>
                <li><Link to="/academy" className={getLinkClass('/academy')}>How it Works</Link></li>
                </ul>
            </div>

            {/* Bottom section - User profile and logout */}
            <div className="space-y-4 px-2 font-Montserrat">
                <div className="flex items-center justify-start">
                <button className="flex items-center justify-center space-x-2">
                    <FaSignOutAlt />
                </button>
                </div>
            </div>

            {/* <div className='font-Montserrat text-[14px]'>
                <ul className="hidden md:flex gap-1">
                <li><Link to="/dashboard" className={getLinkClass('/dashboard')}>Home</Link></li>
                <li><Link to="/new-coin" className={getLinkClass('/new-coin')}>Start a New Coin</Link></li>
                <li><Link to="/portfolio" className={getLinkClass('/portfolio')}>Twitter</Link></li>
                <li><Link to="/trading" className={getLinkClass('/trading')}>Support</Link></li>
                <li><Link to="/watchlist" className={getLinkClass('/watchlist')}>Telegram</Link></li>
                <li><Link to="/academy" className={getLinkClass('/academy')}>How it Works</Link></li>
                </ul>
            </div> */}

            </div>
    </div>
  );
};

export default Navabr;
