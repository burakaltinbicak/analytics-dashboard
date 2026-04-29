
"use client"

import { use } from 'react'
import Link from 'next/link'
import { useWebsites } from '@/app/hooks/useWebsites'
import HeatmapCanvas from '@/app/components/HeatmapCanvas'
import { SideNavBar } from '@/app/components/SideNavBar'
import { TopAppBar } from '@/app/components/TopAppBar'

export default function HeatmapPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const { websites } = useWebsites()
    const site = websites.find(w => w.id === id)

    return (
        <div className="flex min-h-screen bg-[#fdfcf8]">
            {/* Sidebar Bileşeni */}
            <SideNavBar />

            <div className="flex-1 flex flex-col">
                {/* Üst Bar - Site Bilgileri ve Navigasyon */}
                <TopAppBar title={site?.name || "Isı Haritası"} />

                <main className="p-8 max-w-7xl mx-auto w-full">
                    {/* Geri Dönüş ve Site Bilgisi */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            href="/dashboard"
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f4f4f2] text-[#5c5c56] hover:bg-[#4a7c59] hover:text-white transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        {site && (
                            <div>
                                <h1 className="text-3xl font-bold text-[#1c1c1a] tracking-tight font-serif">{site.name}</h1>
                                <p className="text-sm font-medium text-[#aaa]">{site.domain}</p>
                            </div>
                        )}
                    </div>

                    {/* Sekmeler (Tabs) */}
                    <div className="flex bg-[#f4f4f2] p-1.5 rounded-2xl w-fit mb-10 shadow-inner">
                        <Link
                            href={`/dashboard/${id}`}
                            className="px-8 py-2.5 text-sm font-bold text-[#5c5c56] hover:text-[#4a7c59] transition-all rounded-xl"
                        >
                            Sessions & Events
                        </Link>
                        <span className="px-8 py-2.5 text-sm font-bold bg-white text-[#4a7c59] shadow-sm rounded-xl transition-all">
                            Isı Haritası
                        </span>
                    </div>

                    {/* HeatmapCanvas Bileşeni */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <HeatmapCanvas websiteId={id} />
                    </div>
                </main>
            </div>
        </div>
    )
}
