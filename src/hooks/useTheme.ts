'use client'

import { useEffect, useState } from "react"

export const useTheme = () => {
    const [theme, setTheme] = useState("default")

    useEffect(() => {
        const saved = localStorage.getItem("theme")
        if (saved) {
            document.documentElement.setAttribute("data-theme", saved)
            setTheme(saved)
        }
    }, [])

    const changeTheme = (newTheme: string) => {
        document.documentElement.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
        setTheme(newTheme)
    }

    return { theme, changeTheme }
}