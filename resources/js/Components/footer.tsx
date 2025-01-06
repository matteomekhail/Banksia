/**
 * v0 by Vercel.
 * @see https://v0.dev/t/vBdiUutMnVe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function Footer() {
    return (
        <footer className="bg-[#43534A] py-6 w-full">
            <div className="container mx-auto w-full max-w-screen-xl px-4">
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <div>
                        <h2 className="text-sm font-semibold uppercase text-white">Banksia</h2>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold uppercase text-white">Help center</h2>
                        <div className="flex flex-col space-y-1">
                            <a href="tel:0282013159" className="text-gray-300 hover:underline text-sm">
                                02 8201 3159
                            </a>
                            <a href="mailto:info@banksiaoranpark.com.au" className="text-gray-300 hover:underline text-sm">
                                info@banksiaoranpark.com.au
                            </a>
                            <a href="https://instagram.com/banksiacafe" className="text-gray-300 hover:underline text-sm">
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between items-center text-xs text-white">
                    <span>
                        &copy; {new Date().getFullYear()} <a href="https://banksiaoranpark.com.au" className="hover:underline">Banksia</a>. All Rights Reserved.
                    </span>
                    <span>
                        <a href="mailto:info@banksiaoranpark.com.au" className="text-blue-300 hover:underline">info@banksiaoranpark.com.au</a>
                    </span>
                    <span>
                        Developed and designed by <a href="https://stagetwolab.com" className="bg-clip-text text-transparent bg-gradient-to-r from-[#e85f4b] to-[#3a8f87] hover:underline">StageTwo Lab</a>.
                    </span>
                </div>
            </div>
        </footer>
    )
}

function InstagramIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    )
}
