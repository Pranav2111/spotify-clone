import React from 'react'
import Head from 'next/head'
import { getProviders, signIn, useSession } from 'next-auth/react'
import Loader from '../components/Loader';


function Login({ providers }) {

    const { data: session } = useSession();
    
    if (session) return <Loader/>;

    return (
        <>
        <Head>
             <title>Login - Spotify_clone</title>
             <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <img className="w-52 mb-5 rounded-full border border-[#62c086] animate-pulse" src="https://rb.gy/xkacau"/>

            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className="bg-[#18D860] text-black text-xl rounded-full p-5 hover:scale-95 hover:bg-[#4E9F3D] transition-all duration-150" 
                    onClick={()=> signIn(provider.id,{ callbackUrl:"/"})}
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}

        </div>
        </>

    )
}

export default Login;

export async function getServerSideProps() {

    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}
