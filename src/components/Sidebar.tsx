import React from 'react';
import {FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import ActivityNotification from './ActivityNotification';

import logo from "../assets/logo.svg";

const Sidebar: React.FC = () => {

    let location = useLocation();
    console.log(location.pathname);

    // Function to apply active class if the route matches
    const getLinkClass = (path: string) => {
        return location.pathname === path
        ? 'bg-white w-full px-4 py-2 rounded-3xl text-black font-semibold border-4 border-[#49e9dd]': 'text-white px-4'
    }


  return (
    <div className="sidebar bg-[#132d46] text-white min-w-56 min-h-screen flex flex-col justify-between px-4 py-8 shadow-3xl shadow-[#49e9dd] border-r-2 border-[#1b5a71] font-Montserrat">
      {/* Top section - Logo and company name */}
      <div className='flex gap-1 items-center'>
        <img src={logo} alt='' className='w-16 h-16'/>
        <p className='text-[35px] font-Anton tracking-wider'>Dogdefi</p>
      </div>
      <div className='font-Montserrat text-[16px]'>
        <ul className="space-y-8">
          <li><Link to="/dashboard" className={getLinkClass('/dashboard')}>Home</Link></li>
          <li><Link to="/new-coin" className={getLinkClass('/new-coin')}>Start a New Coin</Link></li>
          <li><Link to="/portfolio" className={getLinkClass('/portfolio')}>Twitter</Link></li>
          <li><Link to="/trading" className={getLinkClass('/trading')}>Support</Link></li>
          <li><Link to="/watchlist" className={getLinkClass('/watchlist')}>Telegram</Link></li>
          <li><Link to="/academy" className={getLinkClass('/academy')}>How it Works</Link></li>
        </ul>
      </div>

      <div className='w-full flex flex-col gap-4'>
        <p>Recent Activites :</p>
        <ActivityNotification notification="4dR2Q sold 1.345 SOL of CHLOE" />
      </div>

      {/* Bottom section - User profile and logout */}
      <div className="space-y-4 px-2 font-Montserrat">
        <div className="flex items-center justify-start">
          <button className="flex items-center justify-center space-x-2">
            <FaSignOutAlt />
            <span>Logout Wallet</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
