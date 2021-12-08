import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Poster from './Poster';
import Searchbar from './Searchbar';
import Track from './Track';


function Midbody({ chooseTrack, spotifyApi }) {

    const { data: session } = useSession();
    const { accessToken } = session;
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [newReleases, setNewReleases] = useState([]);


    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);

    }, [accessToken])

    // Search implementation
    useEffect(() => {
        if (!searchInput) return setSearchInput("");
        if (!accessToken) return;

        spotifyApi.searchTracks(searchInput).then((res) => {
            setSearchResult(res.body.tracks.items.map((track) => {
                return {
                    id: track.id,
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: track.album.images[0].url,
                    popularity: track.popularity

                }
            }))
        })

    }, [searchInput, accessToken])


    // New Releases...
    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.getNewReleases().then((res) => {
            setNewReleases(
                res.body.albums.items.map((track) => {
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: track.images[0].url,
                        popularity:track.popularity,
                    };
                })
            );
        });
    }, [accessToken]);
    


    return (
        <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
            <Searchbar searchInput={searchInput} setSearchInput={setSearchInput} />
            <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-8 p-4">
                {searchResult.length === 0
                    ? newReleases
                        .slice(0, 4)
                        .map((track) => (
                            <Poster
                                key={track.id}
                                track={track}
                                chooseTrack={chooseTrack}
                            />
                        ))
                    : searchResult
                        .slice(0, 4)
                        .map((track) => (
                            <Poster
                                key={track.id}
                                track={track}
                                chooseTrack={chooseTrack}
                            />
                        ))}
            </div>
            <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
                {/* Genres */}
                <div className="hidden xl:inline max-w-[270px]">
                    <h2 className="text-white font-bold mb-3">Genres</h2>
                    <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
                        <div className="general" onClick={()=>setSearchInput("Classic")}>Classic</div>
                        <div className="general" onClick={()=>setSearchInput("House")}>House</div>
                        <div className="general" onClick={()=>setSearchInput("Minimal")}>Minimal</div>
                        <div className="general" onClick={()=>setSearchInput("Hip-hop")}>Hip-hop</div>
                        <div className="general" onClick={()=>setSearchInput("Electronic")}>Electronic</div>
                        <div className="general" onClick={()=>setSearchInput("Chillout")}>Chillout</div>
                        <div className="general" onClick={()=>setSearchInput("Blues")}>Blues</div>
                        <div className="general" onClick={()=>setSearchInput("Country")}>Country</div>
                        <div className="general" onClick={()=>setSearchInput("Techno")}>Techno</div>
                    </div>
                    <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out" onClick={()=>setSearchInput("Mix")}>
                        All Genres
                    </button>
                </div>

                {/* Tracks */}
                <div className="w-full pr-11">
                    <h2 className="text-white font-bold mb-3">
                        {searchResult.length === 0 ? "New Releases" : "Tracks"}
                    </h2>
                    <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]">
                        {searchResult.length === 0
                            ? newReleases
                                .slice(4, newReleases.length)
                                .map((track) => (
                                    <Track
                                        key={track.id}
                                        track={track}
                                        chooseTrack={chooseTrack}
                                    />
                                ))
                            : searchResult
                                .slice(4, searchResult.length)
                                .map((track) => (
                                    <Track
                                        key={track.id}
                                        track={track}
                                        chooseTrack={chooseTrack}
                                    />
                                ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Midbody;
