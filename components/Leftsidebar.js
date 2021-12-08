import React from 'react'
import Image from 'next/image'
import { ClockIcon, DotsHorizontalIcon, HomeIcon, MicrophoneIcon, RssIcon, SearchIcon } from '@heroicons/react/solid'

function Leftsidebar() {
    return (
        <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-black w-[90px] h-screen space-y-8">
            <div className="rounded-full border-2 border-[#62c086]">
            <Image src="https://rb.gy/xkacau" width={68} height={64} objectFit="contain" className="animate-pulse"/>
            </div>    
            <div className="flex flex-col space-y-8">
               <HomeIcon className="LeftsidebarIcon text-white opacity-[0.85]"/>
               <SearchIcon className="LeftsidebarIcon"/>
               <MicrophoneIcon className="LeftsidebarIcon"/>
               <RssIcon className="LeftsidebarIcon"/>
               <ClockIcon className="LeftsidebarIcon"/>
               <DotsHorizontalIcon className="LeftsidebarIcon"/>
            </div>
           
        </section>
    )
}

export default Leftsidebar;
