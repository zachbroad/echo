import Image from 'next/image'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center  p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">

                <div>

                    <h1 style={{fontWeight: "bold"}}>ECHO</h1>
                    <h3>MIRRORING YOUR MUSIC</h3>
                </div>


            </div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-7 ">
                <div className="mb-4">
                    <span className="block text-gray-700 text-lg font-bold mb-2">ECHO for Spotify</span>
                    <p className="text-gray-700 text-base">Experience your Spotify listening history like never before. Visualize, reflect, and share your musical journey with Echo.</p>
                </div>
                <div className="flex items-center justify-between">
                    <a href="https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=YOUR_SCOPES" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Connect Your Spotify</a>
                </div>
            </div>
        </main>
    )
}
