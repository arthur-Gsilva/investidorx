'use client'

import { useTheme } from "@/hooks/useTheme"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { FaCircle } from "react-icons/fa"

export const ThemeButton = () => {
    const { theme, changeTheme } = useTheme()

    const colors = [
        { label: "default", color: "#00BB4C" },
        { label: "red", color: "#dc2626" },
        { label: "blue", color: "#2563eb" },
        { label: "brown", color: "#92400e" },
        { label: "purple", color: "#7c3aed" },
        { label: "emerald", color: "#10b981" },
    ]

    const current = colors.find((c) => c.label === theme)

    return (
        <div className="fixed bottom-4 right-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 capitalize cursor-pointer"
                    >
                        <div className="p-1 bg-primary-dark rounded-full">
                            <FaCircle size={14} color={current?.color} />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent   side="top">
                    {colors.map((item) => (
                        <DropdownMenuItem
                            key={item.label}
                            onClick={() => changeTheme(item.label)}
                            className="flex items-center gap-2 capitalize cursor-pointer"
                        >
                            <div className="p-1 bg-primary-dark rounded-full">
                                <FaCircle size={14} color={item.color} />
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}