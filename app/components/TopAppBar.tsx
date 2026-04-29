"use client"

import { usePathname } from 'next/navigation'

interface Props {
    title?: string
}

export function TopAppBar({ title = "web Analytics" }: Props) {
    const pathname = usePathname()

    // Pathname'den sayfa ismini türetme (Örn: /dashboard -> Dashboard)
    const pageTitle = title || pathname.split('/').pop()?.replace(/-/g, ' ') || "Overview"

    return (
        <header className="h-16 px-8 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-[#4a7c59]/10 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <nav className="flex items-center text-xs font-medium text-[#aaa] gap-2">
                    <span className="hover:text-[#4a7c59] cursor-pointer">web Analytics</span>
                    <span>/</span>
                    <span className="text-[#4a7c59] font-bold capitalize">{pageTitle}</span>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                {/* Arama Barı (Opsiyonel) */}
                <div className="hidden md:flex items-center gap-2 bg-[#f4f4f2] px-4 py-2 rounded-xl border border-transparent focus-within:border-[#4a7c59]/20 transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#aaa]"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    <input
                        type="text"
                        placeholder="İçgörülerde ara..."
                        className="bg-transparent border-none outline-none text-xs font-medium text-[#1c1c1a] placeholder:text-[#aaa] w-48"
                    />
                </div>

                {/* Bildirimler */}
                <button className="relative p-2 text-[#5c5c56] hover:bg-[#f4f4f2] rounded-xl transition-all group">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>

                {/* Ayarlar */}
                <button className="p-2 text-[#5c5c56] hover:bg-[#f4f4f2] rounded-xl transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                </button>

                {/* Profil */}
                <div className="w-8 h-8 rounded-full bg-[#e2ece6] border border-[#4a7c59]/10 overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#4a7c59]/20 transition-all">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>
        </header>
    )
}
