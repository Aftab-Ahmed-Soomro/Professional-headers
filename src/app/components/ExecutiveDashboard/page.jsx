'use client'

import React, { useState, useRef, useEffect } from 'react'
import { FiActivity } from "react-icons/fi";
import { MdOutlineVerifiedUser, MdKeyboardArrowDown } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { CiChat1, CiSearch, CiSettings } from 'react-icons/ci';
import { LuDollarSign } from 'react-icons/lu';
import { HiArrowsRightLeft } from 'react-icons/hi2';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';

const ExecutiveDashboard = () => {
    const [active, setActive] = useState("Users");
    const [expandedItems, setExpandedItems] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRefs = useRef({});

    const menuItems = [
        { name: "Search", icon: <CiSearch size={20} /> },
        { name: "Activity Logs", icon: <FiActivity size={20} /> },
        { name: "Config", icon: <HiArrowsRightLeft size={20} /> }
    ];

    // These items will be displayed with dropdown children
    const testingItems = [
      { 
        name: "Operations", 
        icon: <CiSettings size={20} />,
        children: ["Recharge", "Redeem", "Reset Password", "Transfer"]
      },
      { 
        name: "Verification", 
        icon: <MdOutlineVerifiedUser size={20} />,
        children: ["Recharge", "Redeem"] 
      },
      { 
        name: "Finance", 
        icon: <LuDollarSign size={20} />,
        children: ["Cashtag List", "Recharge Queue", "Redeem Queue", "Confirmations"] 
      },
      { 
        name: "Customer Support", 
        icon: <CiChat1 size={20} />,
        children: ["Intercom", "Submit Request", "Player List", "Player Activity","Player Dispute","Rejected Requests","Player Feedback","Player Promotion","Offline Players","Team Members"] 
      }
    ];

    // Toggle expanded state for a specific item
    const toggleExpand = (itemName) => {
      setExpandedItems(prev => {
        const newState = { ...prev };
        
        // Close all other dropdowns
        Object.keys(newState).forEach(key => {
          if (key !== itemName) newState[key] = false;
        });
        
        // Toggle the clicked dropdown
        newState[itemName] = !prev[itemName];
        return newState;
      });
      
      setActive(itemName);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
      function handleClickOutside(event) {
        Object.keys(dropdownRefs.current).forEach(key => {
          if (dropdownRefs.current[key] && !dropdownRefs.current[key].contains(event.target)) {
            setExpandedItems(prev => ({...prev, [key]: false}));
          }
        });
      }
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    
    // Get currently active menu item with children
    const activeMenu = testingItems.find(item => item.name === active);

    return (
      <div className="min-h-screen bg-[#131519]">
        {/* Mobile Header */}
        <div className="lg:hidden bg-[#1A1A1A] py-3 px-4 flex justify-between items-center w-full shadow-md">
          <div className="flex items-center gap-2">
            <img className="h-10" src="./images/logo.webp" alt="Logo" />
            <h1 className="text-sm text-white font-bold">Techmile Solutions</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 cursor-pointer bg-[#1F2A39] rounded-full flex items-center justify-center">
              <FaUserCircle className="h-6 w-6 text-blue-400" />
            </div>
            <button 
              className="p-2 text-white" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <GiHamburgerMenu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}></div>
        )}

        {/* Mobile Menu - Coming from right side */}
        <div className={`lg:hidden fixed top-0 right-0 w-64 h-full bg-[#1A1A1A] z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button onClick={() => setMobileMenuOpen(false)} className="text-white">
              <IoClose size={24} />
            </button>
          </div>
          
          {/* User Profile in Mobile Menu */}
          <div className="flex items-center gap-3 px-4 pb-6 border-b border-gray-700">
            <div className="h-10 w-10 cursor-pointer bg-[#1F2A39] rounded-full flex items-center justify-center">
              <FaUserCircle className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h5 className="text-md text-white font-bold">ANSAR</h5>
              <p className="text-[#6E727A] text-sm">Admin</p>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          <div className="flex flex-col gap-2 p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg transition-all
                ${active === item.name ? "bg-[#1F2A39] text-white border-l-4 border-blue-500" : "text-[#59606B] hover:text-white hover:bg-[#1F2A39]"}`}
                onClick={() => {
                  setActive(item.name);
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-blue-400">{item.icon}</span>
                <p className="text-md font-medium">{item.name}</p>
              </div>
            ))}

            {testingItems.map((item) => (
              <div key={item.name} className="text-[#59606B]">
                <div
                  className={`flex items-center justify-between gap-3 cursor-pointer px-4 py-3 rounded-lg transition-all
                  ${active === item.name ? "bg-[#1F2A39] text-white border-l-4 border-blue-500" : "hover:text-white hover:bg-[#1F2A39]"}`}
                  onClick={() => toggleExpand(item.name)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400">{item.icon}</span>
                    <p className="text-md font-bold">{item.name}</p>
                  </div>
                  <MdKeyboardArrowDown 
                    className={`transition-transform duration-200 ${expandedItems[item.name] ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </div>
                
                {expandedItems[item.name] && (
                  <div className="bg-[#25293A] py-2 px-6 ml-4 my-1 rounded-lg">
                    <ul className="flex flex-col text-white">
                      {item.children.map((childItem) => (
                        <li 
                          key={childItem} 
                          className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors py-2"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <p className="text-sm font-medium">{childItem}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Logout in Mobile Menu */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <div className="px-6 py-3 cursor-pointer bg-[#1F2A39] rounded-lg flex items-center gap-3 text-white hover:bg-red-900 transition-colors">
              <IoIosLogOut className="h-5 w-5" />
              <span>Logout</span>
            </div>
          </div>
        </div>

        {/* Desktop Header Navigation */}
        <div className="hidden lg:flex bg-[#1A1A1A] py-2 px-4 xl:px-10 justify-between w-full overflow-visible shadow-md">
          <div className="flex items-center gap-3 cursor-pointer">
            {/* Logo */}
            <img className="h-12" src="./images/logo.webp" alt="Logo" />
            <h1 className="text-lg text-white font-bold">Techmile Solutions</h1>
          </div>

          {/* Main menu items - flex-shrink-0 added to prevent wrapping */}
          <div className="text-[#59606B] flex items-center py-1 px-2 xl:px-4 gap-1 xl:gap-3 whitespace-nowrap">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className={`flex-shrink-0 flex items-center gap-1 xl:gap-3 cursor-pointer px-2 xl:px-4 py-2 xl:py-3 text-md rounded-lg transition-all border-2 border-[#1A1A1A] focus:border-2 focus:border-blue-500 hover:shadow-lg
                ${active === item.name ? "bg-[#1F2A39] text-white border-blue-500" : "hover:text-white hover:bg-[#1F2A39]"}`}
                tabIndex="0"
                onClick={() => setActive(item.name)}
              >
                <span className="text-blue-400">{item.icon}</span>
                <p className="text-base xl:text-md font-medium">{item.name}</p>
              </div>
            ))}
          </div>

          {/* Testing items */}
          <div className="text-[#59606B] flex items-center py-1 px-2 xl:px-4 gap-1 xl:gap-3 whitespace-nowrap">
            {testingItems.map((item) => (
              <div
                key={item.name}
                ref={el => dropdownRefs.current[item.name] = el}
                className={`flex-shrink-0 relative flex flex-col cursor-pointer px-2 xl:px-4 py-2 xl:py-3 text-md rounded-lg transition-all border-2 border-[#1A1A1A] focus:border-2 focus:border-blue-500 hover:shadow-lg
                ${active === item.name ? "bg-[#1F2A39] text-white border-blue-500" : "hover:text-white hover:bg-[#1F2A39]"}`}
                tabIndex="0"
                onClick={() => toggleExpand(item.name)}
              >
                <div className="flex items-center gap-1 xl:gap-3">
                  <span className="text-blue-400">{item.icon}</span>
                  <p className="text-base xl:text-md font-bold">{item.name}</p>
                  <MdKeyboardArrowDown 
                    className={`ml-1 transition-transform duration-200 ${expandedItems[item.name] ? 'rotate-180' : ''}`} 
                    size={18} 
                  />
                </div>

                {/* Submenu */}
                {expandedItems[item.name] && (
                  <div className="absolute top-full left-0 w-max min-w-full bg-[#25293A] py-3 px-4 shadow-md z-50 transition-all duration-300 border-t border-gray-700 mt-3 rounded-b-lg">
                    <ul className="flex flex-col text-white max-h-100">
                      {item.children.map((childItem) => (
                        <li 
                          key={childItem} 
                          className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors py-2"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <p className="text-xs xl:text-sm font-medium whitespace-nowrap">{childItem}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-white flex items-center gap-2 xl:gap-5 flex-shrink-0">
            <div className="h-8 xl:h-10 w-8 xl:w-10 cursor-pointer bg-[#1F2A39] rounded-full flex items-center justify-center">
              <FaUserCircle className="h-6 xl:h-8 w-6 xl:w-8 text-blue-400" />
            </div>
            <div className="cursor-pointer hidden sm:block">
              <h5 className="text-sm xl:text-md font-bold">ANSAR</h5>
              <p className="font text-[#6E727A] text-xs xl:text-sm">Admin</p>
            </div>
            <div className="h-8 xl:h-10 w-8 xl:w-10 cursor-pointer bg-[#1F2A39] rounded-full flex items-center justify-center hover:bg-red-900 transition-colors">
              <IoIosLogOut className="h-5 xl:h-6 w-5 xl:w-6" />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="p-4 md:p-8">
          {activeMenu && expandedItems[activeMenu.name] ? (
            <div className="bg-[#1A1A1A] rounded-lg p-4 md:p-6 text-white">
              <h2 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-4">{activeMenu.name} Dashboard</h2>
              <p className="text-sm md:text-base text-[#59606B]">You've selected the {activeMenu.name} section. Choose an option from the submenu above.</p>
            </div>
          ) : (
            <div className="bg-[#1A1A1A] rounded-lg p-4 md:p-6 text-white">
              <h2 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-4">Executive Dashboard</h2>
              <p className="text-sm md:text-base text-[#59606B]">Select a menu item to view available options.</p>
            </div>
          )}
        </div>
      </div>
    );
}

export default ExecutiveDashboard;