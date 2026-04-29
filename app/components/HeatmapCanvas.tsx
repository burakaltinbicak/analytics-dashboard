"use client"

import { useEffect, useRef } from 'react'
import { useHeatmap } from '@/app/hooks/useHeatmap'
import ScrollHeatmap from './ScrollHeatmap'
import TimeOnPage from './TimeOnPage'

export default function HeatmapCanvas({ websiteId }: { websiteId: string }) {
    const { clicks, scrollDepths, timeOnPage, loading, error } = useHeatmap(websiteId)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current || clicks.length === 0) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const W = canvas.width
        const H = canvas.height

        ctx.clearRect(0, 0, W, H)

        // Terra Style Grid
        ctx.strokeStyle = 'rgba(74, 124, 89, 0.08)' // Terra Emerald very faint
        ctx.lineWidth = 1
        for (let i = 0; i <= 10; i++) {
            ctx.beginPath()
            ctx.moveTo((W / 10) * i, 0)
            ctx.lineTo((W / 10) * i, H)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(0, (H / 10) * i)
            ctx.lineTo(W, (H / 10) * i)
            ctx.stroke()
        }

        // Terra Style Labels
        ctx.fillStyle = 'rgba(92, 92, 86, 0.4)' // Soft stone
        ctx.font = '600 10px "Nunito Sans", sans-serif'
        for (let i = 0; i <= 10; i += 2) {
            ctx.fillText(`${i * 10}%`, (W / 10) * i + 4, 14)
            ctx.fillText(`${i * 10}%`, 4, (H / 10) * i + 14)
        }

        // Heatmap Clicks
        clicks.forEach(click => {
            const x = (click.x / 100) * W
            const y = (click.y / 100) * H

            // Heat Gradient
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40)
            gradient.addColorStop(0, 'rgba(74, 124, 89, 0.6)') // Using Terra Primary for 'hot' areas in an organic way
            gradient.addColorStop(0.4, 'rgba(212, 220, 207, 0.3)') // Accent sage
            gradient.addColorStop(1, 'rgba(74, 124, 89, 0)')

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(x, y, 40, 0, Math.PI * 2)
            ctx.fill()

            // Core Point
            ctx.fillStyle = '#4a7c59'
            ctx.beginPath()
            ctx.arc(x, y, 2.5, 0, Math.PI * 2)
            ctx.fill()
        })
    }, [clicks])

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-[#4a7c59]/5 animate-pulse">
            <div className="w-10 h-10 border-4 border-[#4a7c59]/20 border-t-[#4a7c59] rounded-full animate-spin mb-4" />
            <p className="text-sm font-bold text-[#aaa] uppercase tracking-widest">Veriler Hazırlanıyor...</p>
        </div>
    )

    if (error) return (
        <div className="p-8 bg-red-50 rounded-3xl border border-red-100 flex items-center gap-4 text-red-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            <p className="font-semibold">{error}</p>
        </div>
    )

    return (
        <div className="flex flex-col gap-10">
            {/* Tıklama Haritası */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#aaa]">Tıklama Haritası</h2>
                        <p className="text-sm text-[#5c5c56] font-medium">{clicks.length} toplam etkileşim tespit edildi.</p>
                    </div>
                </div>

                {clicks.length === 0 ? (
                    <div className="bg-[#f9f9f7] rounded-[2rem] border-2 border-dashed border-[#e7e5e0] py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-[#e2ece6] rounded-2xl flex items-center justify-center text-[#4a7c59] mb-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="m4.2 4.2 2.8 2.8" /><path d="M2 12h4" /><path d="m4.2 19.8 2.8-2.8" /><path d="M12 22v-4" /><path d="m19.8 19.8-2.8-2.8" /><path d="M22 12h-4" /><path d="m19.8 4.2-2.8 2.8" /></svg>
                        </div>
                        <p className="text-[#aaa] font-bold text-sm uppercase tracking-wider">Henüz tıklama verisi yok</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] p-4 border border-[#4a7c59]/5 shadow-[0_20px_50px_rgba(74,124,89,0.04)] overflow-hidden">
                        <canvas
                            ref={canvasRef}
                            width={800}
                            height={500}
                            className="w-full h-auto rounded-2xl"
                            style={{ background: '#fdfcf8' }}
                        />
                    </div>
                )}
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Scroll Haritası */}
                <section className="bg-white p-8 rounded-[2rem] border border-[#4a7c59]/5 shadow-sm">
                    <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#aaa] mb-6">Scroll Derinliği</h2>
                    <ScrollHeatmap scrollDepths={scrollDepths} />
                </section>

                {/* Sayfada Geçirilen Süre */}
                <section className="bg-white p-8 rounded-[2rem] border border-[#4a7c59]/5 shadow-sm">
                    <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#aaa] mb-6">Oturum Süreleri</h2>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl font-bold text-[#1c1c1a]">{timeOnPage.length}</span>
                        <span className="text-sm font-medium text-[#5c5c56]">aktif oturum</span>
                    </div>
                    <TimeOnPage durations={timeOnPage} />
                </section>
            </div>
        </div>
    )
}
