"use client"

import { useEffect, useRef } from 'react'

interface Props {
    scrollDepths: number[]
}

export default function ScrollHeatmap({ scrollDepths }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current || !scrollDepths || scrollDepths.length === 0) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const W = canvas.width
        const H = canvas.height
        ctx.clearRect(0, 0, W, H)

        const totalSessions = scrollDepths.length
        const depths = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        const counts = depths.map(d => scrollDepths.filter(s => s >= d).length)

        depths.forEach((depth, i) => {
            const y = (depth / 100) * H
            const prevY = i === 0 ? 0 : (depths[i - 1] / 100) * H
            const percent = Math.round((counts[i] / totalSessions) * 100)

            let fillColor = 'rgba(74, 124, 89, 0.6)'
            if (percent < 75) fillColor = 'rgba(136, 176, 145, 0.5)'
            if (percent < 50) fillColor = 'rgba(212, 220, 207, 0.4)'
            if (percent < 25) fillColor = 'rgba(230, 184, 162, 0.4)'

            ctx.fillStyle = fillColor
            ctx.fillRect(0, prevY, W, y - prevY)

            ctx.fillStyle = '#5c5c56'
            ctx.font = 'bold 12px "Nunito Sans", sans-serif'
            ctx.fillText(`%${depth} Derinlik`, 16, y - 24)

            ctx.font = '600 11px "Nunito Sans", sans-serif'
            ctx.fillStyle = 'rgba(92, 92, 86, 0.6)'
            ctx.fillText(`${counts[i]} oturum (${percent}%)`, 16, y - 8)

            ctx.strokeStyle = 'rgba(74, 124, 89, 0.1)'
            ctx.lineWidth = 1
            ctx.setLineDash([5, 5])
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(W, y)
            ctx.stroke()
            ctx.setLineDash([])
        })

    }, [scrollDepths])

    if (!scrollDepths || scrollDepths.length === 0) return (
        <div className="flex flex-col items-center justify-center py-10 bg-[#f9f9f7] rounded-2xl border-2 border-dashed border-[#e7e5e0]">
            <p className="text-sm font-bold text-[#aaa] uppercase tracking-wider">Henüz scroll verisi yok</p>
        </div>
    )

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#aaa] uppercase tracking-widest">Görselleştirme</p>
                <div className="px-3 py-1 bg-[#4a7c59]/10 rounded-full">
                    <p className="text-[10px] font-black text-[#4a7c59] uppercase tracking-tighter">
                        Toplam {scrollDepths.length} Oturum
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-1 border border-[#4a7c59]/5 shadow-sm overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={400}
                    className="w-full h-auto rounded-2xl"
                    style={{ background: '#fdfcf8' }}
                />
            </div>

            <div className="flex justify-between items-center px-2">
                <span className="text-[10px] font-bold text-[#aaa] uppercase tracking-widest">Üst Kısım</span>
                <div className="flex-1 border-t border-dashed border-[#e7e5e0] mx-4" />
                <span className="text-[10px] font-bold text-[#aaa] uppercase tracking-widest">Sayfa Sonu</span>
            </div>
        </div>
    )
}