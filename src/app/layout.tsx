import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner"
import { ThemeButton } from "@/components/ThemeButton";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Investidor X",
    description: "Página do investidor boladão",
    icons: {
        icon: "favicon.png"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased pb-4`}
            >
                <Providers>
                    <Header />

                    <main>
                        {children}
                    </main>
                    <Toaster richColors />
                    
                </Providers>

                <ThemeButton />
            </body>
        </html>
    );
}
