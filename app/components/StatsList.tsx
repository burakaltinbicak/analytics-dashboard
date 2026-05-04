"use client"

import { useState } from 'react'
import { useStats } from '@/app/hooks/useStats'
import type { Session, Event as SiteEvent } from '@/types'

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

const sortByDate = <T extends { createdAt: string }>(arr: T[]) =>
    [...arr].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

export default function StatsList({ websiteId }: { websiteId: string }) {
    const { stats, loading, error } = useStats(websiteId)
    const [sessionsOpen, setSessionsOpen] = useState(false)
    const [eventsOpen, setEventsOpen] = useState(false)

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-[#4a7c59]/5 animate-pulse">
            <div className="w-10 h-10 border-4 border-[#4a7c59]/20 border-t-[#4a7c59] rounded-full animate-spin mb-4" />
            <p className="text-xs font-bold text-[#aaa] uppercase tracking-widest">Veriler Yükleniyor...</p>
        </div>
    )

    if (error) return (
        <div className="p-8 bg-red-50 rounded-3xl border border-red-100 flex items-center gap-4 text-red-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            <p className="font-semibold">{error}</p>
        </div>
    )

    if (!stats) return null

    return (
        <div className="flex flex-col gap-6">
            {/* Sessions Section - Accordion */}
            <section className="bg-white border border-[#4a7c59]/5 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(74,124,89,0.03)]">
                <button
                    onClick={() => setSessionsOpen(!sessionsOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#fdfcf8] transition-all cursor-pointer"
                >
                    <div className="flex items-center gap-4">
                        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#aaa]">
                            Oturumlar ({stats.sessions.length})
                        </h2>
                        <span className="text-[10px] font-black bg-[#4a7c59]/10 text-[#4a7c59] px-3 py-1 rounded-full uppercase tracking-tighter">
                            Son Aktiviteler
                        </span>
                    </div>
                    <span className={`material-symbols-outlined text-[#5c5c56] transition-transform duration-300 ${sessionsOpen ? 'rotate-180' : ''}`}>
                        expand_more
                    </span>
                </button>

                {sessionsOpen && (
                    <div className="flex flex-col gap-3 px-6 pb-6">
                        {sortByDate(stats.sessions).map((session: Session) => (
                            <div key={session.id} className="bg-[#fdfcf8] border border-[#e7e5e0] rounded-2xl px-6 py-4 flex items-center justify-between hover:shadow-[0_4px_25px_rgba(74,124,89,0.06)] transition-all group">
                                <div className="flex items-center gap-6">
                                    <div className="w-10 h-10 bg-white border border-[#e7e5e0] rounded-xl flex items-center justify-center text-[#5c5c56] group-hover:bg-[#4a7c59] group-hover:text-white group-hover:border-transparent transition-all">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-sm font-bold text-[#1c1c1a]">
                                            <span>{session.browser}</span>
                                            <span className="w-1 h-1 bg-[#e7e5e0] rounded-full" />
                                            <span>{session.os}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[11px] font-medium text-[#aaa] mt-0.5">
                                            <span>{session.device}</span>
                                            <span>•</span>
                                            <span>{session.screen}</span>
                                            <span>•</span>
                                            <span>{session.language}</span>
                                            {session.country && (
                                                <>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                                        {session.country}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs font-bold text-[#5c5c56]">{formatDate(session.createdAt)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Events Section - Accordion */}
            <section className="bg-white border border-[#4a7c59]/5 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(74,124,89,0.03)]">
                <button
                    onClick={() => setEventsOpen(!eventsOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#fdfcf8] transition-all cursor-pointer"
                >
                    <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#aaa]">
                        Olaylar ({stats.events.length})
                    </h2>
                    <span className={`material-symbols-outlined text-[#5c5c56] transition-transform duration-300 ${eventsOpen ? 'rotate-180' : ''}`}>
                        expand_more
                    </span>
                </button>

                {eventsOpen && (
                    <div className="flex flex-col gap-3 px-6 pb-6">
                        {sortByDate(stats.events).map((event: SiteEvent) => (
                            <div key={event.id} className="bg-[#fdfcf8] border border-[#e7e5e0] rounded-2xl px-6 py-5 hover:border-[#4a7c59]/20 transition-all">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1 bg-[#e2ece6] text-[#4a7c59] rounded-lg text-xs font-black uppercase tracking-wider">
                                            {event.eventname}
                                        </div>
                                        <span className="text-sm font-medium text-[#5c5c56]">{event.url_path}</span>
                                    </div>
                                    <span className="text-[11px] font-bold text-[#aaa]">{formatDate(event.createdAt)}</span>
                                </div>

                                {event.event_data && (
                                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#f4f4f2]">
                                        {Object.entries(event.event_data)
                                            .filter(([_, v]) => v !== null)
                                            .map(([key, value]) => (
                                                <div key={key} className="flex items-center gap-1.5 bg-white border border-[#e7e5e0] px-2.5 py-1 rounded-lg">
                                                    <span className="text-[10px] font-black text-[#aaa] uppercase tracking-tighter">{key}</span>
                                                    <span className="text-xs font-bold text-[#5c5c56]">{String(value)}</span>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}