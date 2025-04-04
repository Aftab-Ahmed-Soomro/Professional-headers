'use client'

import React, { useState } from 'react'
import { TbUsers } from "react-icons/tb";
import { FiActivity } from "react-icons/fi";
import { FaUserCircle } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { HiArrowsRightLeft } from 'react-icons/hi2';
import { HiMenuAlt3 } from 'react-icons/hi';

const AdminDashboard = () => {
    const [active, setActive] = useState("Users");
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const menuItems = [
        { name: "Users", icon: <TbUsers size={20} /> },
        { name: "Activity Logs", icon: <FiActivity size={20} /> },
        { name: "Config", icon: <HiArrowsRightLeft size={20} /> }
    ];

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <div className="relative min-h-screen bg-[#0F0F0F]">
            {/* Header */}
            <div className='bg-[#1A1A1A] px-4 md:px-10 flex flex-wrap md:flex-nowrap items-center justify-between'>
                {/* Logo and Brand */}
                <div className='flex items-center gap-3'>
                    <img className='h-10 md:h-12' src='./images/logo.webp' alt="" />
                    <h1 className='text-md text-white font-bold text-lg w-[100px]'>Techmile Solutions</h1>
                </div>

                {/* Mobile Menu Toggler - only visible on mobile */}
                <div className="flex md:hidden">
                    <button 
                        onClick={toggleMobileMenu} 
                        className="text-white p-2 focus:outline-none"
                    >
                        <HiMenuAlt3 size={24} />
                    </button>
                </div>

                {/* Desktop Navigation - hidden on mobile */}
                <div className="hidden md:flex text-[#59606B] gap-6 lg:gap-12 p-4">
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            className={`flex items-center gap-2 cursor-pointer px-4 lg:px-8 py-2 rounded-lg transition-all border-2 border-[#1A1A1A] focus:border-2 focus:border-blue-500 
                            ${active === item.name ? "bg-[#1F2A39] text-white border-blue-500" : "hover:text-white hover:bg-[#1F2A39]"}`}
                            tabIndex="0"
                            onClick={() => setActive(item.name)}
                        >
                            <span className="text-blue-400">{item.icon}</span>
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>

                {/* User Profile - hidden on mobile */}
                <div className='hidden md:flex text-white items-center gap-3 lg:gap-5'>
                    <div className="h-10 w-10 cursor-pointer bg-[#1F2A39] rounded-full flex items-center justify-center">
                        <FaUserCircle className="h-8 w-8 text-blue-400" />
                    </div>
                    <div className='cursor-pointer'>
                        <h5 className='text-md font-bold'>ANSAR</h5>
                        <p className='font text-[#6E727A] text-sm'>Admin</p>
                    </div>
                    <div className='h-10 w-10 cursor-pointer bg-[#1F2A39] rounded-full flex items-center justify-center hover:bg-red-900 transition-colors'>
                        <IoIosLogOut className="h-6 w-6" />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {showMobileMenu && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}></div>
            )}

            {/* Mobile Menu Sidebar */}
            <div className={`md:hidden fixed top-0 right-0 w-64 h-full bg-[#1A1A1A] z-50 transform transition-transform duration-300 ease-in-out ${showMobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Close button */}
                <div className="flex justify-end p-4">
                    <button onClick={toggleMobileMenu} className="text-white">
                        <IoIosLogOut className="h-6 w-6 transform rotate-180" />
                    </button>
                </div>
                
                {/* User Profile in Mobile Menu */}
                <div className="flex items-center gap-3 px-4 pb-6 border-b border-gray-700">
                    <div className="h-10 w-10 cursor-pointer bg-[#1F2A39] rounded-full flex items-center justify-center">
                        <FaUserCircle className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                        <h5 className='text-md text-white font-bold'>ANSAR</h5>
                        <p className='text-[#6E727A] text-sm'>Admin</p>
                    </div>
                </div>
                
                {/* Mobile Navigation Menu */}
                <div className="flex flex-col gap-2 p-4">
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg transition-all 
                            ${active === item.name ? "bg-[#1F2A39] text-white border-l-4 border-blue-500" : "text-[#59606B] hover:text-white hover:bg-[#1F2A39]"}`}
                            onClick={() => {
                                setActive(item.name);
                                setShowMobileMenu(false);
                            }}
                        >
                            <span className="text-blue-400">{item.icon}</span>
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
                
                {/* Logout in Mobile Menu */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <div className='px-6 py-3 cursor-pointer bg-[#1F2A39] rounded-lg flex items-center gap-3 text-white hover:bg-red-900 transition-colors'>
                        <IoIosLogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl text-white font-bold mb-4">{active}</h2>
                {/* Your content for each section would go here */}
                <div className="bg-[#1A1A1A] rounded-lg p-4 md:p-6 min-h-[70vh]">
                    <p className="text-[#59606B]">{active} dashboard content</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard