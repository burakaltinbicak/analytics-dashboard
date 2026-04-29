"use client"

import Link from 'next/link'
import { useWebsites } from '@/app/hooks/useWebsites'
import { Website } from '@/types'

export default function WebsiteList() {
    const { websites, loading, error } = useWebsites()

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-[#4a7c59]/5 animate-pulse">
            <div className="w-10 h-10 border-4 border-[#4a7c59]/20 border-t-[#4a7c59] rounded-full animate-spin mb-4" />
            <p className="text-xs font-bold text-[#aaa] uppercase tracking-widest">Siteler Yükleniyor...</p>
        </div>
    )

    if (error) return (
        <div className="p-8 bg-red-50 rounded-3xl border border-red-100 flex items-center gap-4 text-red-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            <p className="font-semibold">{error}</p>
        </div>
    )

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.slice().reverse().map((site: Website) => (

                <Link
                    key={site.id}
                    href={`/dashboard/${site.id}`}
                    className="group bg-white rounded-3xl p-6 border border-[#4a7c59]/5 shadow-[0_8px_30px_rgb(74,124,89,0.04)] hover:shadow-[0_20px_40px_rgb(74,124,89,0.1)] hover:border-[#4a7c59]/20 transition-all duration-300"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-[#1c1c1a] group-hover:text-[#4a7c59] transition-colors">{site.name}</h3>
                            <p className="text-[#aaa] text-sm font-medium">{site.domain}</p>
                        </div>
                        <span className="px-3 py-1 bg-[#4a7c59]/10 text-[#4a7c59] rounded-full text-[10px] font-black uppercase tracking-wider">
                            Aktif
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-[#f4f4f2]">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-[#aaa] uppercase tracking-widest">Ziyaretçiler</p>
                            <p className="text-lg font-bold text-[#1c1c1a]">{site.sessionCount}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[10px] font-black text-[#aaa] uppercase tracking-widest">Ort. Süre</p>
                            <span className="text-lg font-bold text-[#1c1c1a]"><p className="text-lg font-bold text-[#1c1c1a]">
                                {Math.floor(site.avgDuration / 60)}:{String(site.avgDuration % 60).padStart(2, '0')}
                            </p></span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center py-2 bg-[#fdfcf8] rounded-xl text-[#4a7c59] text-xs font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        Detayları Gör
                        <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                    </div>
                </Link>
            ))}
        </div>
    )
}
