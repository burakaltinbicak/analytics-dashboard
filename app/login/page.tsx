"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            router.push('/dashboard')
        } else {
            setError('Kullanıcı adı veya şifre yanlış!')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleLogin()
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#fdfcf8] p-4">
            <div className="bg-white rounded-3xl p-10 w-full max-w-[420px] shadow-[0_8px_30px_rgb(74,124,89,0.06)] border border-[#4a7c59]/5 flex flex-col items-center gap-8">
                {/* Logo Area */}
                <div className="w-16 h-16 bg-[#e2ece6] rounded-2xl flex items-center justify-center text-[#4a7c59]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3v18h18" />
                        <path d="M18 17V9" />
                        <path d="M13 17V5" />
                        <path d="M8 17v-3" />
                    </svg>
                </div>

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-[#1c1c1a]">web Analytics</h1>
                    <p className="text-[#5c5c56] text-sm font-medium">Giriş Yap</p>
                </div>

                {error && (
                    <div className="w-full bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        {error}
                    </div>
                )}

                <div className="w-full flex flex-col gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#5c5c56] uppercase tracking-wider ml-1">Kullanıcı adı</label>
                        <input
                            className="w-full bg-[#f9f9f7] border border-[#e7e5e0] rounded-xl px-4 py-3.5 outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/10 transition-all text-[#1c1c1a] placeholder:text-[#aaa]"
                            placeholder="ornek_kullanici"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-bold text-[#5c5c56] uppercase tracking-wider">Şifre</label>
                            <Link href="#" className="text-xs font-semibold text-[#4a7c59] hover:underline">Şifremi unuttum</Link>
                        </div>
                        <input
                            className="w-full bg-[#f9f9f7] border border-[#e7e5e0] rounded-xl px-4 py-3.5 outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/10 transition-all text-[#1c1c1a] placeholder:text-[#aaa]"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                <button
                    className="w-full bg-[#4a7c59] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#3d664a] transition-all shadow-md shadow-[#4a7c59]/20 active:scale-[0.98]"
                    onClick={handleLogin}
                >
                    Giriş
                </button>

                <p className="text-xs text-[#aaa]">
                    Yardıma mı ihtiyacınız var? <Link href="#" className="text-[#4a7c59] font-semibold hover:underline">Destek ile iletişime geçin</Link>
                </p>
            </div>
        </main>
    )
}
