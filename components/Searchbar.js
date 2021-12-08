import { SearchIcon } from '@heroicons/react/solid'
import React from 'react'

function Searchbar({ searchInput, setSearchInput }) {
    return (
        <div className="max-w-[1150px] bg-[#1a1a1a] rounded-full overflow-hidden border-2 border-[#333333] p-1.5 px-5 pr-8 flex items-center">
            <SearchIcon className="h-5 w-5 rounded-full animate-pulse text-gray-200" />
            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 bg-[#1a1a1a] text-white border-none lg:w-full focus:outline-none focus:ring-0 pl-1 placeholder-[#fafafa] text-xs"
                placeholder="Search..."
            />
            <div className="hidden md:inline-flex items-center">
                <div className="flex space-x-2 pr-5">
                    <button className="Searchtag" onClick={()=>setSearchInput("Romantic")}>Romantic</button>
                    <button className="Searchtag" onClick={()=>setSearchInput("Classic")}>Classic</button>
                    <button className="Searchtag" onClick={()=>setSearchInput("Party")}>Party</button>
                </div>
            </div>
        </div>
    )
}

export default Searchbar;
