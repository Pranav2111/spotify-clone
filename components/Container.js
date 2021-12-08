import React, { useEffect, useState } from 'react'
import Midbody from './Midbody'
import Leftsidebar from './Leftsidebar'
import Rightsidebar from './Rigthsidebar'
import SpotifyWebApi from 'spotify-web-api-node';
import { useRecoilState } from 'recoil';
import { playingTrackState } from '../atoms/playerAtom';
import Player from './Player';
import { useSession } from 'next-auth/react';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
});



function Container() {

    const { data: session } = useSession();
    const { accessToken } = session;


    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        setShowPlayer(true);
    }, []);

    const chooseTrack = (track) => {
        setPlayingTrack(track);
    };

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    return (
        <main className="flex min-h-screen max-w-screen bg-black lg:pb-24">
            <Midbody chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
            <Leftsidebar />
            <Rightsidebar chooseTrack={chooseTrack} spotifyApi={spotifyApi} />

            {showPlayer && (
                <div className="fixed bottom-0 left-0 right-0 z-50">
                    <Player accessToken={accessToken} trackUri={playingTrack.uri} />
                </div>
            )}
        </main>

    )
}

export default Container
