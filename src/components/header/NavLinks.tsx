
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMdHome } from 'react-icons/io'
import { MdShowChart, MdWork } from 'react-icons/md'

interface NavLinksProps {
    onLinkClick: () => void
}

const navItems = [
    {
        href: '/',
        label: 'Início',
        icon: IoMdHome,
    },
    {
        href: '/acoes',
        label: 'Ações',
        icon: MdShowChart,
    },
    {
        href: '/projetos',
        label: 'Projetos',
        icon: MdWork,
    },
]

export default function NavLinks({ onLinkClick }: NavLinksProps) {
    const pathname = usePathname()

    return (
        <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={`group relative flex items-center gap-4 px-6 py-4 text-base font-medium transition-all duration-200 sm:py-5 sm:text-[1.0625rem] ${isActive
                                    ? 'bg-blue-50 text-primary'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                }`}
                            onClick={onLinkClick}
                        >
                            <span
                                className={`absolute left-0 top-1/2 h-0 w-1 -translate-y-1/2 rounded-r bg-primary transition-all duration-200 ${isActive
                                        ? 'h-[60%]'
                                        : 'group-hover:h-[60%]'
                                    }`}
                            />

                            <Icon
                                size={24}
                                className={`shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'
                                    }`}
                            />
                            <span>{item.label}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}