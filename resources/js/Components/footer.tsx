/**
 * v0 by Vercel.
 * @see https://v0.dev/t/vBdiUutMnVe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-[#43534A] p-6 md:py-12 w-full ">
            <div className="container max-w-7xl flex gap-4 text-sm md:flex-row ">
                <p className="text-white dark:text-gray-400">© {new Date().getFullYear()} Developed and Designed by:</p>
                <div>
                    <Link className="text-blue-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="https://matteomekhail.dev">
                        <p> Matteo Mekhail</p>
                    </Link>
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
