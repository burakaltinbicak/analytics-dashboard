"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
    open: boolean
    onClose: () => void
}

export default function AddSiteModal({ open, onClose }: Props) {
    const [name, setName] = useState('')
    const [domain, setDomain] = useState('')
    const [loading, setLoading] = useState(false)
    const [script, setScript] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const router = useRouter()

    if (!open) return null

    const handleSubmit = async () => {
        if (!name || !domain) return
        setLoading(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/websites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, domain })
        })

        const data = await res.json()
        setScript(data.script)
        setLoading(false)
        router.refresh()
    }

    const handleCopy = () => {
        if (!script) return
        navigator.clipboard.writeText(script)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleClose = () => {
        setName('')
        setDomain('')
        setScript(null)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                {!script ? (
                    <>
                        <h2 className="text-2xl font-bold text-[#1c1c1a] mb-6 font-serif">Yeni Site Ekle</h2>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-xs font-bold text-[#aaa] uppercase tracking-widest mb-2">Site Adı</p>
                                <input
                                    className="w-full border border-[#4a7c59]/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
                                    placeholder="Örn: Benim Blogum"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#aaa] uppercase tracking-widest mb-2">Domain</p>
                                <input
                                    className="w-full border border-[#4a7c59]/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4a7c59] transition-colors"
                                    placeholder="Örn: benimblogum.com"
                                    value={domain}
                                    onChange={e => setDomain(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={handleClose}
                                    className="flex-1 border border-[#4a7c59]/20 text-[#5c5c56] py-3 rounded-xl font-bold text-sm hover:bg-[#f4f4f2] transition-colors"
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || !name || !domain}
                                    className="flex-1 bg-[#4a7c59] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#3d664a] transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Ekleniyor...' : 'Ekle'}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#4a7c59]/10 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#4a7c59]">check</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1c1c1a]">Site Eklendi!</h2>
                                <p className="text-xs text-[#aaa]">Script'i sitenize ekleyin</p>
                            </div>
                        </div>
                        <div className="bg-[#fdfcf8] rounded-xl p-4 mb-4 border border-[#4a7c59]/10">
                            <code className="text-xs text-[#5c5c56] break-all">{script}</code>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCopy}
                                className="flex-1 bg-[#4a7c59] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#3d664a] transition-colors"
                            >
                                {copied ? '✓ Kopyalandı' : 'Kopyala'}
                            </button>
                            <button
                                onClick={handleClose}
                                className="flex-1 border border-[#4a7c59]/20 text-[#5c5c56] py-3 rounded-xl font-bold text-sm hover:bg-[#f4f4f2] transition-colors"
                            >
                                Kapat
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}