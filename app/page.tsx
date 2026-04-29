import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fdfcf8]">
      <div className="terra-card flex flex-col items-center gap-8 w-[400px] p-12">
        <div className="w-16 h-16 bg-[#e2ece6] rounded-2xl flex items-center justify-center text-[#4a7c59]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#1c1c1a]">web Analytics</h1>
          <p className="text-[#5c5c56] text-sm">Verilerinizle kök salın.</p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Link href="/login" className="w-full bg-[#4a7c59] text-white py-3 rounded-xl text-center font-semibold hover:bg-[#3d664a] transition-all shadow-sm active:scale-[0.98]">
            Giriş Yap
          </Link>
          <Link href="/register" className="w-full border-2 border-[#e7e5e0] text-[#5c5c56] py-3 rounded-xl text-center font-semibold hover:border-[#4a7c59] hover:text-[#4a7c59] transition-all active:scale-[0.98]">
            Kayıt Ol
          </Link>
        </div>

        <div className="flex gap-4 text-xs text-[#aaa]">
          <Link href="#" className="hover:text-[#4a7c59]">Hakkımızda</Link>
          <Link href="#" className="hover:text-[#4a7c59]">Gizlilik</Link>
          <Link href="#" className="hover:text-[#4a7c59]">Destek</Link>
        </div>
      </div>
    </main>
  )
}
