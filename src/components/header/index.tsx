'use client'

import { useState } from 'react'
import { IoMdMenu } from 'react-icons/io'
import Sidebar from './Sidebar'

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    return (
        <>
            <header className="border-b border-gray-200 bg-white w-full py-4 shadow-sm ">
                <nav className='px-6 max-w-7xl mx-auto flex items-center justify-between'>
                    <div className="select-none text-2xl font-bold text-gray-900 md:text-3xl">
                        Investidor <span className="text-primary">X</span>
                    </div>
                    <button
                        className="flex items-center cursor-pointer justify-center rounded-lg p-2 text-primary transition-all duration-200 hover:bg-gray-100 hover:text-primary active:scale-95"
                        onClick={toggleSidebar}
                        aria-label="Abrir menu"
                        aria-expanded={isSidebarOpen}
                    >
                        <IoMdMenu size={28} />
                    </button>
                </nav>
            </header>

            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </>
    )
}