"use client"

interface Props {
    durations: number[]
}

export default function TimeOnPage({ durations }: Props) {
    if (!durations || durations.length === 0)
        return (
            <div className="flex flex-col items-center justify-center py-10 bg-[#f9f9f7] rounded-2xl border-2 border-dashed border-[#e7e5e0]">
                <p className="text-sm font-bold text-[#aaa] uppercase tracking-wider">Henüz veri yok</p>
            </div>
        )

    const avg = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
    const max = Math.max(...durations)
    const min = Math.min(...durations)

    const format = (s: number) => s >= 60
        ? `${Math.floor(s / 60)}dk ${s % 60}sn`
        : `${s}sn`

    return (
        <div className="flex flex-col gap-8">
            {/* Özet Metrik Kartları */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Ortalama', value: format(avg), icon: 'schedule', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'En Uzun', value: format(max), icon: 'trending_up', color: 'text-[#4a7c59]', bg: 'bg-[#e2ece6]' },
                    { label: 'En Kısa', value: format(min), icon: 'trending_down', color: 'text-stone-500', bg: 'bg-stone-50' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white border border-[#4a7c59]/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-3">
                            <div className={`w-8 h-8 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center`}>
                                <span className="material-symbols-outlined text-lg">{stat.icon}</span>
                            </div>
                            <p className="text-[10px] font-black text-[#aaa] uppercase tracking-widest">{stat.label}</p>
                        </div>
                        <p className="text-2xl font-bold text-[#1c1c1a] tracking-tight">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Oturum Dağılım Grafiği */}
            <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-xs font-bold text-[#aaa] uppercase tracking-[0.15em]">Oturum Dağılımı</h3>
                    <span className="text-[10px] font-bold text-[#5c5c56] bg-[#f4f4f2] px-2 py-0.5 rounded-md">Max: {format(max)}</span>
                </div>

                <div className="flex flex-col gap-2.5">
                    {durations.map((d, i) => (
                        <div key={i} className="group flex items-center gap-4">
                            <span className="text-[10px] font-bold text-[#aaa] w-14 text-right tabular-nums">{format(d)}</span>
                            <div className="flex-1 h-3 bg-[#f9f9f7] rounded-full overflow-hidden border border-[#e7e5e0]/30 relative">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-95"
                                    style={{
                                        width: `${(d / max) * 100}%`,
                                        background: d >= avg
                                            ? 'linear-gradient(90deg, #4a7c59 0%, #6db17f 100%)'
                                            : 'linear-gradient(90deg, #d4dccf 0%, #e7e5e0 100%)'
                                    }}
                                />
                                {d === max && (
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-[#f4f4f2]">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#4a7c59]" />
                    <span className="text-[10px] font-bold text-[#5c5c56] uppercase tracking-tighter">Ortalama Üstü</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#d4dccf]" />
                    <span className="text-[10px] font-bold text-[#5c5c56] uppercase tracking-tighter">Ortalama Altı</span>
                </div>
            </div>
        </div>
    )
}
