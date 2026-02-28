
import { useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import NavLinks from './NavLinks'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])


    return (
        <>
            <div
                className={`fixed inset-0 z-100 bg-black/50 transition-opacity duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />

            <aside
                className={`fixed bottom-0 right-0 top-0 z-101 flex w-70 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-[320px] ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                aria-label="Menu de navegação"
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-6">
                    <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
                    <button
                        className="flex items-center justify-center cursor-pointer rounded-lg p-2 text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 active:scale-95"
                        onClick={onClose}
                        aria-label="Fechar menu"
                    >
                        <IoMdClose size={28} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                    <NavLinks onLinkClick={onClose} />
                </nav>
            </aside>
        </>
    )
}